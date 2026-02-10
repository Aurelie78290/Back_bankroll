import express from "express";
import userActions from "../actions/userActions.js";
import sessionActions from "../actions/sessionActions.js";
import tagActions from "../actions/tagActions.js";

const router = express.Router();

// ==========================================
// ROUTES USERS (BREAD)
// ==========================================
router.get('/users', userActions.browse);       
router.get('/users/:id', userActions.read);     
router.post('/users', userActions.add);         
router.put('/users/:id', userActions.edit);     
router.delete('/users/:id', userActions.destroy); 

// ==========================================
// ROUTES SESSIONS (BREAD)
// ==========================================
router.get('/sessions', sessionActions.browse);
router.get('/sessions/:id', sessionActions.read);
router.post('/sessions', sessionActions.add);
router.put('/sessions/:id', sessionActions.edit);
router.delete('/sessions/:id', sessionActions.destroy);

// ==========================================
// ROUTES TAGS (BREAD)
// ==========================================
router.get('/tags', tagActions.browse);
router.get('/tags/:id', tagActions.read);
router.post('/tags', tagActions.add);
router.put('/tags/:id', tagActions.edit);
router.delete('/tags/:id', tagActions.destroy);

export default router;