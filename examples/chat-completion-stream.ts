import { Featherless } from "featherless";

const client_featherless = new Featherless({ debug: true });

(async () => {
  const data = await client_featherless.chat.completions({
    messages: [
      {
        role: "user",
        content: "Hey",
      },
    ],
    model: "oxyapi/oxy-1-small",
    stream: true,
    stream_options: {
      include_usage: true,
    },
  });
  for await (const chunk of data) {
    if (chunk.object == "error") {
      process.stdout.write(chunk.error.message);
    } else {
      const choice = chunk.choices?.[0];
      const usage = chunk?.usage;
      if (choice) {
        process.stdout.write(choice.delta.content || "");
      }
      if (usage) {
        console.log("\n", usage);
      }
    }
  }
})();
