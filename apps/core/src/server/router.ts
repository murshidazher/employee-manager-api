import { Router } from "express";

import api from "objects/api";

const router: Router = Router({});

/* routes */
router.get("/version", api.http.getVersion);

export default router;
