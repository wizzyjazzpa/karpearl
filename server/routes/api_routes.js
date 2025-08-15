const express = require('express');
const router = express.Router();
const api_controller = require('../controller/api_controller.');
const fileupload = require('../middleware/fileupload')

router.post('/register_admin',api_controller.register_admin);
router.post('/admin_login',api_controller.login);
router.post('/volunteer',api_controller.volunteer);
router.post('/newsletter',api_controller.newsletter);
router.post('/post_numbers',api_controller.post_numbers);
router.post('/contact',api_controller.contact);
router.post('/donation',api_controller.donation);
router.get('/programs',api_controller.getImages);
router.get('/upcoming',api_controller.getupComing);


// Admin endpoint
router.post('/events_upload',fileupload.single('image'),api_controller.eventUplaod);
router.post('/teamUpload',fileupload.single('team_image'),api_controller.teamUpload);
router.post('/upcomingEvents',fileupload.single('upcoming_image'),api_controller.upcoming_events)

module.exports = router;