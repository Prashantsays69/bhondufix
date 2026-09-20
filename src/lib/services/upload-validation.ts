/**
 * Server-Side Image & Payload Validation Service
 * Milestone 4: Backend / Analyze Endpoint Integration
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  code?: string;
  mimeType?: string;
  byteLength?: number;
}

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB

const ALLOWED_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "image/bmp",
]);

/**
 * Validates base64 data URL server-side, checking MIME header, magic bytes, and size.
 */
export function validateUploadedImage(dataUrl: string): ValidationResult {
  if (!dataUrl || typeof dataUrl !== "string") {
    return {
      isValid: false,
      code: "MISSING_IMAGE",
      error: "No image payload received by the server.",
    };
  }

  // Check data URL format
  const matches = dataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
  if (!matches) {
    return {
      isValid: false,
      code: "MALFORMED_PAYLOAD",
      error: "Image payload must be a valid base64 data URL.",
    };
  }

  const declaredMime = matches[1].toLowerCase();
  const base64Data = matches[2];

  if (!ALLOWED_MIME_TYPES.has(declaredMime)) {
    return {
      isValid: false,
      code: "UNSUPPORTED_MEDIA_TYPE",
      error: `Unsupported image format (${declaredMime}). Please upload PNG, JPG, WebP, GIF, or BMP.`,
    };
  }

  let buffer: Buffer;
  try {
    buffer = Buffer.from(base64Data, "base64");
  } catch {
    return {
      isValid: false,
      code: "MALFORMED_IMAGE",
      error: "Corrupted or unreadable base64 image data.",
    };
  }

  // Size limit validation
  if (buffer.length > MAX_IMAGE_BYTES) {
    const sizeMb = (buffer.length / (1024 * 1024)).toFixed(1);
    return {
      isValid: false,
      code: "PAYLOAD_TOO_LARGE",
      error: `Uploaded image size (${sizeMb} MB) exceeds server limit of 10 MB.`,
    };
  }

  if (buffer.length < 50) {
    return {
      isValid: false,
      code: "IMAGE_TOO_SMALL",
      error: "Image payload is too small to be a valid screenshot.",
    };
  }

  // Magic Bytes Validation (Prevent renamed executable / text payloads)
  const isMagicValid = verifyMagicBytes(buffer, declaredMime);
  if (!isMagicValid) {
    return {
      isValid: false,
      code: "INVALID_IMAGE_SIGNATURE",
      error: "File signature does not match declared image format. Potential corrupted or invalid file.",
    };
  }

  return {
    isValid: true,
    mimeType: declaredMime,
    byteLength: buffer.length,
  };
}

/**
 * Checks magic byte signatures for common screenshot formats
 */
function verifyMagicBytes(buffer: Buffer, declaredMime: string): boolean {
  if (buffer.length < 12) return false;

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    declaredMime === "image/png" &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return true;
  }

  // JPEG: FF D8 FF
  if (
    (declaredMime === "image/jpeg" || declaredMime === "image/jpg") &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return true;
  }

  // WebP: 52 49 46 46 (RIFF) ... 57 45 42 50 (WEBP)
  if (
    declaredMime === "image/webp" &&
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return true;
  }

  // GIF: 47 49 46 38 (GIF8)
  if (
    declaredMime === "image/gif" &&
    buffer[0] === 0x47 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x38
  ) {
    return true;
  }

  // BMP: 42 4D (BM)
  if (declaredMime === "image/bmp" && buffer[0] === 0x42 && buffer[1] === 0x4d) {
    return true;
  }

  return false;
}
