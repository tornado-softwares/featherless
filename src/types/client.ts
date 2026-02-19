export interface client_construtor {
  base_url?: string;
  api_key?: string;
  debug?: boolean;
  concurrency?: number;
  app?:{
    name:string
    url:string
  }
}
