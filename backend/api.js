import express from 'express';
import cors from 'cors';

import { echoController } from "./controllers/echo.js";
import { userController } from "./controllers/user.js";
import { scoreController } from "./controllers/score.js";
import { logRequest } from "./util/logger.js";
import { setController } from './controllers/set.js';

export const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(logRequest);

router.use('/echo', echoController);
router.use('/users', userController);
router.use('/sets', setController);
router.use('/scores', scoreController);

router.use((req, res) => {
    //console.log(req);
    res.status(404);
    res.json({ message: 'Route does not exist' });
});

export { router as apiRouter };
