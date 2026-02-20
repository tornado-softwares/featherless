import { Featherless } from "featherless";

const client_featherless = new Featherless({ debug: true });

(async () => {
  const data = await client_featherless.chat.completions({
    model: "Qwen/Qwen3-32B",
    messages: [
      {
        role: "user",
        content: "What's the weather like in San Francisco?",
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "get_current_weather",
          description: "Get the current weather in a given location",
          parameters: {
            type: "object",
            properties: {
              location: {
                type: "string",
                description: "The city and state, e.g. San Francisco, CA",
              },
            },
            required: ["location"],
          },
        },
      },
    ],
  });
  if (data.choices?.[0]){
    if (data.choices[0].message.role == "assistant"){
      if (data.choices[0].message.tool_calls?.[0]){
        console.log(data.choices[0].message.tool_calls?.[0])
      }
    }
  }
})();
