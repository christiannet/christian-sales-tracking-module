import { Router } from 'express';
import { container } from '../../container';
import { TYPES } from '../../types';
import { PromoterController } from '../controllers/PromoterController';
import { SaleController }     from '../controllers/SaleController';
import { ProgressController } from '../controllers/ProgressController';
import { AuthController }     from '../controllers/AuthController';
import { authMiddleware }     from '../middleware/auth.middleware';

const router = Router();

const promoterCtrl = container.get<PromoterController>(TYPES.PromoterController);
const saleCtrl     = container.get<SaleController>(TYPES.SaleController);
const progressCtrl = container.get<ProgressController>(TYPES.ProgressController);
const authCtrl     = container.get<AuthController>(TYPES.AuthController);

// Health check — sin autenticación, usado por Docker para verificar el servicio
router.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Public — no token required
router.post('/auth/login', authCtrl.login);

// Protected — all routes below require a valid Bearer token
router.use(authMiddleware);

router.get('/promoters',        promoterCtrl.getAll);
router.get('/promoters/:id',    promoterCtrl.getById);
router.post('/sales',           saleCtrl.create);
router.get('/sales/:userId',    saleCtrl.getByUserId);
router.get('/progress/:userId', progressCtrl.getByUserId);

export default router;
