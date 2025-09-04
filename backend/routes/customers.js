import express from 'express';
import { createCustomer, listCustomers, getCustomer, updateCustomer, deleteCustomer } from '../controllers/customerController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, createCustomer);
router.get('/', authenticateToken, listCustomers);
router.get('/:id', authenticateToken, getCustomer);
router.put('/:id', authenticateToken, updateCustomer);
router.delete('/:id', authenticateToken, deleteCustomer);

export default router;
