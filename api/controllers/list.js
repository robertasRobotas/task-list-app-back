const UserSchema = require('../models/user');
const ListSchema = require('../models/list');
const TaskSchema = require('../models/task');



module.exports.CREATE_LIST = (req, res) => {


    let newDate = new Date().toISOString();
    const list = new ListSchema({
        userID: req.body.userID,
        listName: req.body.listName,
        tasksID: [],
        date : newDate
    });

    list.save().then((result) => {
        res.status(200).json({
            list: result,
            message: "list created"
        });
    }).catch(() => {
        res.status(500).json({
            message: "something went wrong"
        });
    })
};




module.exports.ADD_TASK_TO_LIST = (req, res) => {


   req.body.listOfTasks.map((task)=>{

    let taskInfo = new TaskSchema({
        taskTitle : task.taskTitle,
        taskStatus : task.taskStatus,
        listID : req.body.listID
    });

    taskInfo.save().then().catch(()=>{console.log("errrrrrrrrrr");});
   })

   res.status(201).json({
    message : "tasks saved"
   });

};



module.exports.ADD_ONE_TASK_TO_LIST = (req, res) => {


    let taskInfo = new TaskSchema({
        taskTitle : req.body.taskTitle,
        taskStatus : req.body.taskStatus,
        listID : req.body.listID
    });

    taskInfo.save().then(()=>{
        res.status(201).json({
            message : "tasks saved"
           });
    })
    .catch(()=>{console.log("errrrrrrrrrr");});


};


module.exports.CHANGE_TASK_STATUS = (req, res) => {

    TaskSchema.findOne({_id : req.body.taskID}).then((task)=>{

            console.log(typeof task.taskStatus);

        TaskSchema.updateOne(
            {
                _id: req.body.taskID
            },{taskStatus : !task.taskStatus}
        ).then((result) => {
            res.status(200).json({
                message: "task status updated",
                task : result
            });
        })
        .catch((err)=>{
            console.log(err);
        });

    });

};


module.exports.DELETE_TASK = (req, res) => {


        console.log(req.body.taskID);
        TaskSchema.remove({_id : req.body.taskID})
        .then(()=>{
            res.status(200).json({
                message : "task deleted"
            })
        })
        .catch(err=>{console.log(err)});

};


module.exports.GET_USER_LISTS = (req, res) => {


    UserSchema.findOne({_id : req.body.userID}).then((user)=>{
        ListSchema.find({userID : user._id}).then((result) => {

            if (result) {
                res.status(200).json({
                    message: "list found",
                    lists: result,
                    user: user
                });
            } else {
                res.status(500).json({
                    message: "list where not found",
                });
            }
        }).catch(() => {
            res.status(500).json({
                message: "list where not found",
            });
        })



    });

};

module.exports.GET_USER_LISTS_DETAILS = (req, res) => {

    ListSchema.findOne({userID: req.body.userID, _id: req.body.listID}).then((result) => {

        if (result) {
            res.status(200).json({
                message: "list details",
                lists: result
            });
        } else {
            res.status(500).json({
                message: "list where not found",
            });
        }
    }).catch(() => {
        res.status(500).json({
            message: "list where not found",
        });
    })

};


module.exports.GET_USER_LIST_TASKS = (req, res) => {

    ListSchema.findOne({ _id : req.body.listID}).then((list)=>{

        TaskSchema.find({listID : req.body.listID})
        .then((result)=>{
            res.status(201).json({
                message : "List tasks",
                listName : list.listName,
                tasks : result
            });
        })
        .catch();

    });

};


module.exports.CHANGE_LIST_TASK_STATUS = (req, res) => {

    ListSchema.findOne({userID: req.body.userID, _id: req.body.id}).then((result) => {

        result.tasks.forEach(task => {
            if (req.body.taskID == task._id) {
                console.log(task._id);


                if (result) {
                    res.status(200).json({
                        message: "task details",
                        task: task
                    });
                } else {
                    res.status(500).json({
                        message: "task where not found",
                    });
                }
            }

        });

    }).catch(() => {
        res.status(500).json({
            message: "task where not found",
        });
    });
};

module.exports.DELETE_LIST = (req, res) => {

    ListSchema.deleteOne({_id: req.body.id}).then((result) => {
            res.status(200).json({
                message : "list were deleted"
            });
    }).catch(()=>{
        res.status(403).json({
                message : "error deleting list"
            });
    });
}
