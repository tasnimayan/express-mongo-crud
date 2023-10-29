const express = require('express')
const router = express.Router()

const profileController = require("../controllers/profileController")
const authVerifyMiddleware = require('../middlewares/authVerifyMiddleware')
const todoListController = require('../controllers/toDoListController')

// User routes
router.post("/user/register", profileController.userRegister)
router.post("/user/login", profileController.userLogin)
router.get("/user/profile", authVerifyMiddleware, profileController.userProfile)
router.post("/user/update", authVerifyMiddleware, profileController.updateProfile)

// Todo list routes
router.post("/todo/create", authVerifyMiddleware, todoListController.createTodo)
router.get("/todo/read/", authVerifyMiddleware, todoListController.readTodo)
router.post("/todo/update/:id", authVerifyMiddleware, todoListController.updateTodo)
router.post("/todo/update/status/:id", authVerifyMiddleware, todoListController.updateStatus)
router.get("/todo/delete/:id", authVerifyMiddleware, todoListController.deleteTodo)
router.get("/todo/filter/:search", authVerifyMiddleware, todoListController.filterTodo)
router.post("/todo/filter", authVerifyMiddleware, todoListController.filterTodoByDate)





module.exports = router;