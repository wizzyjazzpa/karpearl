const express = require('express');
const router = express.Router();
 const controlpages = require('../controller/control_pages');
const admin_token_verify = require('../middleware/verify_admin_token');



router.get('/',controlpages.home)
router.get('/about',controlpages.about)
router.get('/contact',controlpages.contact)
router.get('/volunteer',controlpages.volunteer);
router.get('/donation',controlpages.donation);
router.get('/programs',controlpages.event_program);
router.get('/upcoming_events',controlpages.upcoming_events)


//ADMIN END //
router.get('/login',controlpages.Admin_login);
router.get('/admin-home',admin_token_verify,controlpages.Admin_home);
router.get('/logout',controlpages.Admin_logout)


module.exports =router;