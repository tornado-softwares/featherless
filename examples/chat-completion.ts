import { Featherless } from "featherless";

const client_featherless = new Featherless({ debug: true });

(async () => {
  const data = await client_featherless.chat.completions({
    model: "oxyapi/oxy-1-small",
    messages: [{ role: "user", content: "Hello!" }],
    presence_penalty: 0.5,
    frequency_penalty: 0.5,
    temperature: 0.7,
    top_p: 0.9,
    max_tokens: 100,
  });
  console.log(JSON.stringify(data, null, 2));
})();
