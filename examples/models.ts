import { Featherless } from "featherless";

const client_featherless = new Featherless({ debug:true });

(async () => {
  const models = await client_featherless.models.list();
  console.log(`There is ${models.length} models.`);
})();

