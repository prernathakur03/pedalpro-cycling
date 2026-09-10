const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const ctrl = require('../controllers/apiControllers');
const chatbotCtrl = require('../controllers/chatbotController');

// Auth
router.post('/auth/login', ctrl.login);
router.get('/auth/me', authenticateToken, ctrl.getMe);

// Cycles & Pricing (Public & Admin)
router.get('/cycles', ctrl.getCyclesAndPricing);
router.post('/cycles', authenticateToken, ctrl.createCycle);
router.put('/cycles/:id', authenticateToken, ctrl.updateCycle);
router.delete('/cycles/:id', authenticateToken, ctrl.deleteCycle);
router.put('/pricing', authenticateToken, ctrl.updatePricing);

// Calculator Backend Validation
router.post('/calculator/verify', ctrl.calculatePrice);

// Content (Public)
router.get('/settings', ctrl.getSettings);
router.get('/faqs', ctrl.getFaqs);
router.get('/rental-rules', ctrl.getRentalRules);
router.get('/gallery', ctrl.getGallery);
router.get('/reviews', ctrl.getReviews);

// Content Management (Admin)
router.put('/settings', authenticateToken, ctrl.updateSettings);

router.get('/faqs/admin', authenticateToken, ctrl.getAllFaqsAdmin);
router.post('/faqs', authenticateToken, ctrl.createFaq);
router.put('/faqs/:id', authenticateToken, ctrl.updateFaq);
router.delete('/faqs/:id', authenticateToken, ctrl.deleteFaq);

router.get('/rental-rules/admin', authenticateToken, ctrl.getAllRentalRulesAdmin);
router.post('/rental-rules', authenticateToken, ctrl.createRentalRule);
router.put('/rental-rules/:id', authenticateToken, ctrl.updateRentalRule);
router.delete('/rental-rules/:id', authenticateToken, ctrl.deleteRentalRule);

router.get('/gallery/admin', authenticateToken, ctrl.getAllGalleryAdmin);
router.post('/gallery', authenticateToken, ctrl.createGalleryItem);
router.delete('/gallery/:id', authenticateToken, ctrl.deleteGalleryItem);

router.get('/reviews/admin', authenticateToken, ctrl.getAllReviewsAdmin);
router.post('/reviews', authenticateToken, ctrl.createReview);
router.delete('/reviews/:id', authenticateToken, ctrl.deleteReview);

// Chatbot Endpoint
router.post('/chat', chatbotCtrl.handleChat);

module.exports = router;