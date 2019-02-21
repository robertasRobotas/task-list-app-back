const express = require('express');
const router = express.Router();


const auth = require('../midleware/auth');

const ListController = require('../controllers/list');

router.post('/createList', auth, ListController.CREATE_LIST);

router.post('/addTaskToList',auth, ListController.ADD_TASK_TO_LIST);

router.post('/addOneTaskToList', auth, ListController.ADD_ONE_TASK_TO_LIST);

router.post('/changeTaskStatus', ListController.CHANGE_TASK_STATUS);

router.post('/deleteTask', ListController.DELETE_TASK);

router.get('/getAllUserLists', auth, ListController.GET_USER_LISTS);

router.post('/getUserListsDetails',auth, ListController.GET_USER_LISTS_DETAILS);

router.post('/getUserListTasks', ListController.GET_USER_LIST_TASKS);

router.post('/changeListTaskStatus', ListController.CHANGE_LIST_TASK_STATUS);

router.post('/deleteList', auth,ListController.DELETE_LIST );


module.exports = router;