import data, { type Data } from "./data";
import http, { type Http } from "./http";

interface Api {
  data: Data;
  http: Http;
}

const api: Api = {
  data,
  http,
};

export default api;
