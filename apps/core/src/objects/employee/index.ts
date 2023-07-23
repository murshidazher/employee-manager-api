import data, { type Data } from "./data";
import http, { type Http } from "./http";

interface Employees {
  data: Data;
  http: Http;
}

const employees: Employees = {
  data,
  http,
};

export default employees;
