import 'express-session';

declare module 'express-session' {
  interface SessionData {
    llmConfig?: {
      baseUrl: string;
      apiKey: string;
      model: string;
    };
  }
}
