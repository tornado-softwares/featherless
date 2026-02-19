import { Client } from "@/client";
import { parseServerSentEvents } from "@/lib/sse";
import {
  chat_completion,
  chat_completion_chunk,
  chat_completion_method,
  chat_completion_method_non_streaming,
  chat_completion_method_streaming,
} from "@/types/chat";

export class Chat {
  constructor(private client: Client) {}

  completions(
    body: chat_completion_method_non_streaming,
  ): Promise<chat_completion>;
  completions(
    body: chat_completion_method_streaming,
  ): Promise<AsyncIterable<chat_completion_chunk>>;
  async completions(
    body: chat_completion_method,
  ): Promise<chat_completion | AsyncIterable<chat_completion_chunk>> {
    const response = await this.client.request("/chat/completions", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return body.stream == true
      ? this.handleStream(response)
      : ((await response.json()) as chat_completion);
  }

  private async *handleStream(response: Response): AsyncIterable<chat_completion_chunk> {
    for await (const event of parseServerSentEvents(response)) {
      if (event.data === "[DONE]") {
        break;
      }
      try {
        yield JSON.parse(event.data) as chat_completion_chunk;
      } catch (error) {
        this.client.logger.error("Could not parse SSE data.");
      }
    }
  }
}
