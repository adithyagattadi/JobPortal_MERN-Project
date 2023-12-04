const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { createJobType, allJobsType, updateJobsType, deleteJobType,  } = require('../controllers/jobTypeController');


// Job Types routes

// api/type/create
router.post('/type/create', isAuthenticated, createJobType)
// api/type/jobs
router.get('/type/jobs', allJobsType)
// api/type/update/:type_id
router.put('/type/update/:type_id', isAuthenticated, isAdmin, updateJobsType)
// api/type/delete/type_id
router.delete('/type/delete/:type_id', isAuthenticated, deleteJobType)


module.exports = router;