export interface ErrorCommon {
  statusCode?: number;
  errorCode?: string;
  message?: string;
  errorDetails?: {
    message?: string;
    code?: string;
  };
}
