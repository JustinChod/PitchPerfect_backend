export interface SalesDeckRequest {
  company_name: string;
  industry: string;
  buyer_persona: string;
  main_pain_point: string;
  use_case: string;
  logo_base64?: string;
}

export interface SalesDeckResponse {
  success: boolean;
  file_id: string;
  download_url: string;
  filename: string;
  slides_generated: number;
  expires_at: string;
}

export interface ApiError {
  error: string;
}

export interface FormData {
  companyName: string;
  industry: string;
  buyerPersona: string;
  mainPainPoint: string;
  useCase: string;
  logo?: File;
}

export interface FormErrors {
  companyName?: string;
  industry?: string;
  buyerPersona?: string;
  mainPainPoint?: string;
  useCase?: string;
  logo?: string;
}