export interface FortuneData {
  fortune: string;
  luckyItem: string;
  advice: string;
}

export interface ErrorResponse {
  message: string;
  code?: number;
}