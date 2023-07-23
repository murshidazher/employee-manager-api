import config from "src/config";

import MongoDB from "core/dbs/mongodb";

const mongo = new MongoDB({
  url: config.data.mongo.url,
  db: config.data.mongo.db,
});

export default { mongo };
