export type MascotState = 'confused' | 'analyzing' | 'detective' | 'warning' | 'solved';

export type ExplanationMode = 'bhondu' | 'normal';

export interface StepItem {
  title: string;
  instruction: string;
}

export interface AIResponseContract {
  problem: string;
  explanation: string;
  confidence: number;
  steps: StepItem[];
  warnings: string[];
  verification: string;
  need_more_context: boolean;
  follow_up_request: string;
}

export interface AnalyzeRequestPayload {
  image: string; // base64 data URL or URL
  context?: string;
  mode?: ExplanationMode;
  category?: string;
  previousContext?: {
    problem?: string;
    attemptedSteps?: string[];
  };
}

export type UXState =
  | 'empty'
  | 'uploading'
  | 'analyzing'
  | 'low_confidence'
  | 'safe_result'
  | 'risky_result'
  | 'unsupported'
  | 'ai_error'
  | 'timeout'
  | 'fixed'
  | 'not_fixed';

export interface CategoryItem {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  iconName: string;
  exampleImage?: string;
}
