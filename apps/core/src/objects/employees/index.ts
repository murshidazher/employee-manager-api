import data, { type Data } from "./data";
import http, { type Http } from "./http";

type Employees = {
  data: Data,
  http: Http
}

const employees: Employees = {
  data,
  http,
};

export default employees;
