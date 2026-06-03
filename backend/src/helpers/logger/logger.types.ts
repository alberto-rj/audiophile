export interface LogContext {
  requestId?: string;
  userId?: string;
  method?: string;
  path?: string;
  statusCode?: number;
  durationMs?: number;
  ip?: string;
  [key: string]: unknown; // extra free fields
}

export interface RequestContext {
  requestId: string;
  userId?: string;
  startTime: number;
}
