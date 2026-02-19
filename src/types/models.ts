import { MODEL_METRICS } from "@/lib/constants";

export type model_class = keyof typeof MODEL_METRICS;

type MetricsFor<K extends model_class> = (typeof MODEL_METRICS)[K];

export type model = {
  [K in model_class]: {
    informations: {
      id: string;
      by: string;
      gated: boolean;
      class: K;
      available: boolean;
    };
    inference: {
      concurrency_cost: MetricsFor<K>["cost"];
      context_length: MetricsFor<K>["context"];
      tools: boolean;
    };
  };
}[model_class];