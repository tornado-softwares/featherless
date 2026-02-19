import { Client } from "@/client";
import { tokenize_method } from "@/types/tokenize";

export class Text {
  constructor(private client: Client) {}

  async tokenize(parameters: tokenize_method) {
    const response = await this.client.request("/tokenize", {
      method: "POST",
      body: JSON.stringify(parameters),
    });
    const { count } = await response.json();
    return count as number
  }
}
