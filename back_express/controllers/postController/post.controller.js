const db = require('../../db')
const utilits = require('./functions')
const getLog = require('../../middleware/testMidleware') 

// const emitter = require('../../emmiter/emmiter')



class PostController{
  
  
  //path (/api)
  async createPost(req, res, next) {
    // method (post + body{"message":"lorem..."}) path (/post)
    await utilits.create(req)
    res.sendStatus(200)
    next(getLog(await utilits.getAll()))
  } 

  async getAllPost(req, res) {
    // method (get) path (/postAll)
    const allPost = await utilits.getAll()
    res.json(allPost)
  }

  async deletePost(req, res, next) {
    // method (delete) path (/post?id=...)
    const delPost = await utilits.delPost(req)
    res.sendStatus(200)
    next(getLog(await utilits.getAll()))
  }
  
  async updatePost(req, res, next) {
    // method (put + body{"message":"lorem...", "id":"1"})) path (/post)
    const upPost = await utilits.upPost(req)
    res.sendStatus(200)
    next(getLog(await utilits.getAll()))
  }

  async toggleStatus(req, res, next) {
    //method (put)  path(/postToggle)
    const togStat = await utilits.togStat(req)
    res.sendStatus(200)
    next(getLog(await utilits.getAll()))
  }
}


module.exports = new PostController()