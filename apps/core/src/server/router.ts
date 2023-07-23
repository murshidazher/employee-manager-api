import { Router } from "express";

import api from "objects/api";
import employee from "objects/employee";

const router: Router = Router({});

/* routes */

/* api */
router.get("/version", api.http.getVersion);

/* employee */
router.get("/employee", employee.http.get);
router.post("/employee", employee.http.add);
router.put("/employee/:empId", employee.http.update);
router.delete("/employee/:empId", employee.http.remove);

export default router;
