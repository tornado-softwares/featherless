import { Client } from "@/client";
import { model, model_class } from "../types/models";
import { MODEL_METRICS } from "@/lib/constants";

export class Models {
  constructor(private client: Client) {}

  async list() {
    const response = await this.client.request("/models");
    const { data } = await response.json()
    const models: model[] = [];
    for (const model_data of data) {

      const _class = model_data.model_class as model_class;
      const id = model_data.id as string;
      const by = model_data.by as string;
      const gated = model_data.is_gated as boolean;
      const available = model_data.available_on_current_plan as boolean;
      const tools = (model_data?.features?.tool_use as boolean) ?? false;
      const model_metrics = MODEL_METRICS[_class];

      if (!model_metrics) {
        this.client.logger.warn(
          `Model ${model_data.id} of class ${_class} is not yet implemented.`,
        );
        continue;
      }

      const model: model = {
        informations: {
          id,
          by,
          gated,
          available,
          class: _class as any,
        },
        inference: {
          concurrency_cost: model_metrics["cost"] as any,
          context_length: model_metrics["context"] as any,
          tools,
        },
      };
      models.push(model);
    }
    return models;
  }
}
