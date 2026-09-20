"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { BhonduMascot } from "@/components/mascot/BhonduMascot";
import { Button } from "@/components/ui/Button";
import { MascotState, ExplanationMode, AIResponseContract } from "@/lib/types";
import {
  UploadCloud,
  FileImage,
  X,
  RefreshCw,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";

interface ScreenshotIntakeProps {
  mode: ExplanationMode;
  onAnalyze?: (data: { image: string; context: string; result: AIResponseContract }) => void;
  className?: string;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "image/bmp",
];

export const ScreenshotIntake: React.FC<ScreenshotIntakeProps> = ({
  mode,
  onAnalyze,
  className = "",
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageMeta, setImageMeta] = useState<{ width: number; height: number; sizeStr: string } | null>(null);
  const [context, setContext] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStatus, setProcessingStatus] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Derive active mascot state based on current intake stage
  const currentMascotState: MascotState = isProcessing
    ? "analyzing"
    : errorMessage
    ? "warning"
    : previewUrl
    ? "detective"
    : "confused";

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const validateAndProcessFile = useCallback((selectedFile: File) => {
    setErrorMessage(null);

    // 1. File Type Validation
    if (!ALLOWED_TYPES.includes(selectedFile.type.toLowerCase())) {
      setErrorMessage(
        `Unsupported file type (${selectedFile.type || "unknown"}). Please upload a screenshot in PNG, JPG, WebP, GIF, or BMP format.`
      );
      return;
    }

    // 2. File Size Validation
    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      const sizeMb = (selectedFile.size / (1024 * 1024)).toFixed(1);
      setErrorMessage(
        `File is too large (${sizeMb} MB). Please upload a screenshot under 10 MB.`
      );
      return;
    }

    // 3. Create preview and read image dimensions
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        if (img.naturalWidth < 40 || img.naturalHeight < 40) {
          setErrorMessage(
            "Image dimensions are too small to be a readable screenshot. Please upload a full screenshot."
          );
          return;
        }

        setFile(selectedFile);
        setPreviewUrl(dataUrl);
        setImageMeta({
          width: img.naturalWidth,
          height: img.naturalHeight,
          sizeStr: formatFileSize(selectedFile.size),
        });
      };
      img.onerror = () => {
        setErrorMessage("Could not parse image. The file appears to be corrupted.");
      };
      img.src = dataUrl;
    };
    reader.onerror = () => {
      setErrorMessage("Error reading file from disk.");
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  // Handle Drag & Drop events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current && !dropZoneRef.current.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  // Handle File Input Change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  // Handle Global Clipboard Paste (Ctrl+V / Cmd+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "INPUT"
      ) {
        return;
      }

      if (e.clipboardData?.files && e.clipboardData.files.length > 0) {
        const pastedFile = e.clipboardData.files[0];
        if (pastedFile.type.startsWith("image/")) {
          e.preventDefault();
          validateAndProcessFile(pastedFile);
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [validateAndProcessFile]);

  // Handle Remove Screenshot
  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
    setImageMeta(null);
    setErrorMessage(null);
    setIsProcessing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Trigger File Dialog
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle Real Backend Submission to POST /api/analyze (M4 Backend Integration)
  const handleSendToBhondu = async () => {
    if (!previewUrl) return;

    setIsProcessing(true);
    setErrorMessage(null);
    setProcessingStatus("Uploading securely & validating on server...");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: previewUrl,
          context: context.trim(),
          mode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Backend error (HTTP ${response.status})`);
      }

      setProcessingStatus("Verified by backend!");
      if (onAnalyze) {
        onAnalyze({
          image: previewUrl,
          context: context.trim(),
          result: data,
        });
      }
    } catch (err: any) {
      setErrorMessage(
        err.message || "Failed to reach the backend analysis service. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        onChange={handleFileInputChange}
        className="hidden"
        id="bhondu-screenshot-input"
        aria-label="Upload Screenshot"
      />

      {/* Mascot Intake Header Card */}
      <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-3xl bg-[#111113] border-2 border-[#27272A] shadow-md transition-all">
        <div className="shrink-0">
          <BhonduMascot state={currentMascotState} size={110} />
        </div>

        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex items-center justify-center sm:justify-start">
            <span className="text-lg sm:text-xl font-black text-[#F4F4F5]">
              {isProcessing
                ? "Connecting to Backend 🚀"
                : previewUrl
                ? "Screenshot Ready! 🔍"
                : "Bas screenshot bhe 💀"}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
            {isProcessing
              ? processingStatus
              : previewUrl
              ? "Bhondu can see the screen! Add optional context below if you want, or send directly."
              : "Drop the confusing window, error dialog, or terminal line. You can also paste from clipboard (Ctrl+V)."}
          </p>

          <div className="flex items-center justify-center sm:justify-start pt-1 text-[11px] text-[#71717A]">
            <span>Supported formats: PNG, JPG, WebP up to 10MB</span>
          </div>
        </div>
      </div>

      {/* Error Message Banner */}
      {errorMessage && (
        <div
          role="alert"
          className="p-4 rounded-2xl bg-[#FB7185]/10 border-2 border-[#FB7185]/40 text-[#FB7185] text-xs flex items-start justify-between gap-3 shadow-sm animate-in fade-in duration-200"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#FB7185]" />
            <div>
              <p className="font-bold text-[#FB7185]">Hold on! Bhondu had an issue with that file:</p>
              <p className="text-[#F4F4F5]/90 mt-0.5">{errorMessage}</p>
            </div>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-[#FB7185] hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload Zone or Image Preview Area */}
      {!previewUrl ? (
        /* Empty Upload Dropzone */
        <div
          ref={dropZoneRef}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
          className={`relative cursor-pointer select-none rounded-3xl border-2 border-dashed p-8 sm:p-14 text-center transition-all duration-200 group focus-visible:outline-none focus-visible:border-[#C7FF3D] focus-visible:ring-2 focus-visible:ring-[#C7FF3D] ${
            isDragging
              ? "border-[#C7FF3D] bg-[#C7FF3D]/10 scale-[1.01] shadow-[0_0_30px_rgba(199,255,61,0.2)]"
              : "border-[#27272A] hover:border-[#C7FF3D]/60 bg-[#111113]/70 hover:bg-[#18181B]"
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              triggerFileInput();
            }
          }}
          aria-label="Drop screenshot here or click to browse files"
        >
          <div className="max-w-md mx-auto space-y-4">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border-2 transition-all duration-200 ${
                isDragging
                  ? "bg-[#C7FF3D] text-[#09090B] border-[#C7FF3D] scale-110 rotate-3"
                  : "bg-[#18181B] text-[#C7FF3D] border-[#27272A] group-hover:scale-105 group-hover:border-[#C7FF3D]/40"
              }`}
            >
              <UploadCloud className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-[#F4F4F5]">
                {isDragging ? "Drop it right here! 🎯" : "Drag and drop your screenshot here"}
              </h3>
              <p className="text-xs text-[#A1A1AA]">
                or <span className="text-[#C7FF3D] font-bold underline underline-offset-2">browse files</span> on your device
              </p>
            </div>

            {/* Quick paste helper badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-[11px] text-[#A1A1AA]">
              <span>💡 Tip: Press</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#27272A] text-[#F4F4F5] font-mono text-[10px]">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#27272A] text-[#F4F4F5] font-mono text-[10px]">V</kbd>
              <span>to paste straight from Snipping Tool</span>
            </div>

            {/* Quick sample loader (Development only) */}
            {process.env.NODE_ENV !== "production" && (
              <div className="pt-1">
                <button
                  type="button"
                  id="load-sample-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    fetch("/test-screenshot.png")
                      .then((r) => r.blob())
                      .then((blob) => {
                        const sampleFile = new File([blob], "test-screenshot.png", { type: "image/png" });
                        validateAndProcessFile(sampleFile);
                      });
                  }}
                  className="text-[11px] font-bold text-[#C7FF3D] hover:underline cursor-pointer transition-all focus-visible:outline-none"
                >
                  + Load sample screenshot for testing
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Image Preview Card */
        <div className="rounded-3xl bg-[#18181B] border-2 border-[#27272A] p-5 sm:p-6 space-y-5 shadow-lg relative overflow-hidden">
          {/* Header toolbar for preview */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#27272A]">
            <div className="flex items-center gap-2">
              <FileImage className="w-4 h-4 text-[#C7FF3D]" />
              <span className="text-xs font-bold text-[#F4F4F5] truncate max-w-[200px] sm:max-w-xs">
                {file?.name || "screenshot.png"}
              </span>
              {imageMeta && (
                <span className="text-[10px] text-[#A1A1AA] bg-[#111113] px-2 py-0.5 rounded-full border border-[#27272A]">
                  {imageMeta.width}×{imageMeta.height} • {imageMeta.sizeStr}
                </span>
              )}
            </div>

            {/* Action buttons: Replace & Remove */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={triggerFileInput}
                disabled={isProcessing}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A1A1AA] hover:text-[#F4F4F5] bg-[#111113] hover:bg-[#27272A] px-3 py-1.5 rounded-full border border-[#27272A] transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Replace</span>
              </button>

              <button
                type="button"
                onClick={handleRemove}
                disabled={isProcessing}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FB7185] hover:text-white bg-[#FB7185]/10 hover:bg-[#FB7185]/20 px-3 py-1.5 rounded-full border border-[#FB7185]/30 transition-colors cursor-pointer disabled:opacity-50"
              >
                <X className="w-3 h-3" />
                <span>Remove</span>
              </button>
            </div>
          </div>

          {/* Screenshot Display Frame with optional Scanline Effect */}
          <div className="relative rounded-2xl overflow-hidden bg-[#09090B] border-2 border-[#27272A] max-h-[380px] flex items-center justify-center group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Screenshot preview for diagnosis"
              className={`w-full h-auto max-h-[380px] object-contain transition-opacity duration-300 ${
                isProcessing ? "opacity-75 blur-[0.5px]" : "opacity-100"
              }`}
            />

            {/* Visual Scanline Animation during Processing */}
            {isProcessing && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent shadow-[0_0_15px_#22D3EE] animate-scanline" />
                <div className="absolute inset-0 bg-[#22D3EE]/5" />
              </div>
            )}
          </div>

          {/* Optional Context Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="bhondu-user-context"
                className="text-xs font-bold text-[#F4F4F5] flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C7FF3D]" />
                <span>Optional Context (What happened right before this?)</span>
              </label>
              <span className="text-[10px] text-[#71717A] font-mono">
                {context.length}/500
              </span>
            </div>

            <textarea
              id="bhondu-user-context"
              value={context}
              onChange={(e) => setContext(e.target.value.slice(0, 500))}
              disabled={isProcessing}
              placeholder="e.g. 'I was trying to install package X' or 'This popped up after Windows update' (Leave blank if not sure!)"
              rows={2}
              className="w-full bg-[#111113] border-2 border-[#27272A] focus:border-[#C7FF3D] rounded-2xl p-3 text-xs sm:text-sm text-[#F4F4F5] placeholder-[#71717A] focus:outline-none transition-colors resize-none disabled:opacity-50"
            />

            <p className="text-[11px] text-[#71717A] flex items-center gap-1">
              <Info className="w-3 h-3 text-[#A1A1AA]" />
              <span>Never include passwords, API keys, or personal credentials.</span>
            </p>
          </div>

          {/* "Send to Bhondu" Primary Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#A1A1AA] hidden sm:block" aria-live="polite">
              {isProcessing ? (
                <span className="text-[#22D3EE] font-bold flex items-center gap-1.5 animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  {processingStatus}
                </span>
              ) : (
                <span>Ready to inspect with {mode.toUpperCase()} explanation</span>
              )}
            </div>

            <Button
              variant="lime"
              size="lg"
              onClick={handleSendToBhondu}
              disabled={isProcessing}
              className="w-full sm:w-auto text-sm sm:text-base px-8 py-3.5 shadow-[0_4px_0_0_#84B512]"
              icon={
                isProcessing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )
              }
            >
              {isProcessing ? "Validating on server..." : "Send to Bhondu 🚀"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
