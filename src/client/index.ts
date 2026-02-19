import { client_construtor } from "@/types/client";
import { API_KEY, BASE_URL } from "@/lib/constants";
import { Models } from "@/client/models";
import { Logger } from "./logger";
import { Text } from "./text";
import { Chat } from "./chat";

export class Client {
  private api_key: string;
  private base_url: string;
  private app;

  private concurrency: number = 0;
  private max_concurrency: number;

  public debug: boolean;

  public models = new Models(this);
  public logger = new Logger(this);
  public text = new Text(this);
  public chat = new Chat(this);

  constructor({
    app,
    api_key = API_KEY,
    base_url = BASE_URL,
    debug = false,
    concurrency = 4,
  }: client_construtor = {}) {
    if (!api_key)
      throw new Error("Please pass an API Key from env or constructor.");
    this.api_key = api_key;
    this.base_url = base_url;
    this.debug = debug;
    this.max_concurrency = concurrency;
    this.app = app;
  }

  public async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.base_url}${endpoint}`;
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${this.api_key}`,
      "Content-Type": "application/json",
      ...(this.app?.name && { "X-Title": this.app.name }),
      ...(this.app?.url && { "HTTP-Referer": this.app.url }),
    };
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response;
  }
}
