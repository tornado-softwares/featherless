import { model_class } from "./models";

export type finish_reason =
  | "stop"
  | "tool_calls"
  | "length"
  | "content_filter"
  | null;
export type usage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

export interface message_base {
  content: string;
}

export interface message_system extends message_base {
  role: "system";
}

export interface message_user extends message_base {
  role: "user";
}

export interface message_assistant extends message_base {
  role: "assistant";
  tool_calls?: tool_call[];
}

export interface message_tool extends message_base {
  role: "tool";
  tool_call_id: string;
}

export type message =
  | message_system
  | message_user
  | message_assistant
  | message_tool;

export type tool_call = {
  id: string;
  function: {
    arguments: string;
    name: string;
  };
  type: "function";
};

export type tool = {
  function: {
    name: string;
    description?: string;
    parameters?: any;
    strict?: boolean;
  };
  type: "function";
};

export interface chat_completion_method_base {
  messages: message[];
  model: string;
  presence_penalty?: number;
  frequency_penalty?: number;
  repetition_penalty?: number;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  min_p?: number;
  seed?: number;
  stop?: string[] | string;
  stop_token_ids?: number[];
  include_stop_str_in_output?: boolean;
  max_tokens?: number;
  min_tokens?: number;
  tools?: tool[];
}

export interface chat_completion_method_streaming extends chat_completion_method_base {
  stream: true;
  stream_options?: {
    include_usage?: boolean;
  };
}

export interface chat_completion_method_non_streaming extends chat_completion_method_base {
  stream?: false;
}

export type chat_completion_method =
  | chat_completion_method_streaming
  | chat_completion_method_non_streaming;

export type chat_completion_choice = {
  index: number;
  message: message;
  finish_reason: finish_reason;
};

export interface chat_completion_base {
  id: string;
  created: number;
  model: string;
}

export interface chat_completion extends chat_completion_base {
  object: "chat.completion";
  choices: chat_completion_choice[];
  system_fingerprint: string;
  usage: usage;
}

export type chat_completion_chunk_choice = {
  index: number;
  logprobs?: null;
  delta: {
    content: string;
  };
  finish_reason: finish_reason;
};

export interface chat_completion_chunk_success extends chat_completion_base {
  object: "chat.completion.chunk";
  choices: chat_completion_chunk_choice[];
  usage?: usage;
}

export interface chat_completion_chunk_error extends chat_completion_base {
  object: "error";
  error: {
    code: "failed_generation";
    message: string;
    details: {
      model: string;
      model_class: model_class;
      n: number;
    };
  };
}

export type chat_completion_chunk =
  | chat_completion_chunk_success
  | chat_completion_chunk_error;
