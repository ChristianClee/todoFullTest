const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController/post.controller')

//path (/api)

router.post('/post', postController.createPost)
router.get('/postAll', postController.getAllPost)
router.delete('/post', postController.deletePost)
router.put('/post', postController.updatePost)
router.put('/postToggle', postController.toggleStatus)



module.exports = router