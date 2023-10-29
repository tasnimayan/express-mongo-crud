const ToDo = require('../models/todoListModel');



// Create a todo list
exports.createTodo = async(req, res)=>{
  const email = req.headers['email']
  let payload = req.body
  let sub = payload['todoSubject']
  let desc = payload['todoDescription']
  let status = payload['todoStatus'] || "new"
  let date = Date.now()

  let postBody = {
    email: email,
    todoSubject: sub,
    todoDescription: desc,
    todoStatus: status,
    todoDate: date
  }
  console.log(postBody);

  await ToDo.create(postBody).then(()=>{
    res.send(postBody)
  }).catch(err => {
    console.log(err);
    res.send({status:"failed"})
  })
}



// Read todo list
exports.readTodo = async(req, res)=>{
  const email = req.headers['email']
  await ToDo.find({email:email}).then(data =>{
    res.send(data)
  }).catch(err=>{
    res.send({status:"No data found"})
  })
}

// Update todo list
exports.updateTodo = async(req, res)=>{
  const email = req.headers['email']
  const id = req.params.id

  let updatedData = req.body

  await ToDo.updateOne({$and:[{_id:id}, {email:email}]}, updatedData).then(()=>{
    res.send({status:"Updated successfully"})
  })
  .catch(err =>{
    console.log(err);
    res.send({status:"Failed"})
  })
}

// Update todo status
exports.updateStatus = async(req, res)=>{
  const email = req.headers['email']
  const id = req.params.id

  let todoStatus = req.body['todoStatus']
  let updateDate = Date.now()

  await ToDo.updateOne({$and:[{_id:id}, {email:email}]}, {$set:{todoStatus:todoStatus, updatedAt:updateDate}}).then(()=>{
    res.send({status:"Updated successfully"})
  })
  .catch(err =>{
    console.log(err);
    res.send({status:"Failed"})
  })
}


// Delete todo list
exports.deleteTodo = async(req, res)=>{

  const email = req.headers['email']
  const id = req.params['id']

  await ToDo.deleteOne({_id:id, email:email}).then(()=>{
    res.send({status:"Deleted successfully"})
  })
  .catch(err =>{
    console.log(err);
    res.send({status:"Failed"})
  })
}

exports.filterTodo = async(req, res)=>{
  const email = req.headers['email']
  const status = req.params['search']
  await ToDo.find({email:email, todoStatus:status}).then(data =>{
    res.send(data)
  }).catch(err=>{
    res.send({status:"No data found"})
  })
}



exports.filterTodoByDate = async(req, res)=>{
  const email = req.headers['email']
  const {fromDate, toDate} = req.body
  await ToDo.find({email:email, todoDate:{$gte:new Date(fromDate), $lte:new Date(toDate)}}).then(data =>{
    res.send(data)
  }).catch(err=>{
    res.send({status:"No data found"})
  })
}



