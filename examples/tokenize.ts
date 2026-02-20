import { Featherless } from "featherless";

const client_featherless = new Featherless({ debug:true });

(async () => {
  const tokens = await client_featherless.text.tokenize({
    model : "oxyapi/oxy-1-small",
    text  : "Tinky Winky is the first Teletubby who lives in Teletubbyland with the other Teletubbies. "
  })
  console.log(`There is ${tokens} tokens.`)
})();
