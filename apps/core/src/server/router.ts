import { Router } from "express";

import api from "objects/api";
import employee from "objects/employee";

const router: Router = Router({});

/* routes */

/* api */
router.get("/version", api.http.getVersion);

/* employee */

const EMPLOYEE_SLUG = "/employee";
router.get(EMPLOYEE_SLUG, employee.http.get);
router.get(`${EMPLOYEE_SLUG}/:empId`, employee.http.get);
router.post(EMPLOYEE_SLUG, employee.http.add);
router.put(`${EMPLOYEE_SLUG}/:empId`, employee.http.update);
router.delete(`${EMPLOYEE_SLUG}/:empId`, employee.http.remove);

export default router;
