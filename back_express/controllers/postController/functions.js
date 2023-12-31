const db = require('../../db')


class Utilits{
  static dbParams() {
    const table = process.env.POST_TABLE_DB
    const culomn_1 = process.env.ID_COLUMN
    const culomn_2 = process.env.MESSAGE_TEXT_COLUMN
    const culomn_3 = process.env.SUCCESS_COLUMN

    return {table, culomn_1, culomn_2, culomn_3}
  }

  static async create(req) {
    const { table, culomn_2 } = this.dbParams()
    const { message } = req.body
    const newPost = await db.query(
        `INSERT INTO ${table} (${culomn_2}) VALUES ('${message}')`
    )
    // console.log(newPost)
    return newPost
  }

  static async getAll() {
    const { table,culomn_1 } = this.dbParams()
    const allPost = await db.query(`SELECT * FROM ${table} ORDER BY ${culomn_1} ASC`)
    // console.log(allPost.rows)
    return allPost.rows
  }

  static async delPost(req) {
    const { table, culomn_1 } = this.dbParams()
    const { id } = req.query
    const deleteElem = await db.query(
      `DELETE FROM ${table} WHERE ${culomn_1}='${id}' RETURNING *`
    )
    return deleteElem.rows
  }

  static async upPost(req) {
    const { table, culomn_1, culomn_2 } = this.dbParams()
    const { id, message } = req.body
    
    const updetedEl = await db.query(
      `UPDATE ${table} SET ${culomn_2}='${message}' WHERE ${culomn_1}='${id}' RETURNING *`
    ) 
    return updetedEl.rows 
  }

  static async togStat(req) {
    const { table, culomn_1, culomn_3 } = this.dbParams()
    
    const { id } = req.query
    let newValue = await db.query(
      `SELECT ${culomn_3} FROM ${table} WHERE ${culomn_1}='${id}'`
    )
    newValue = ! newValue.rows[0].success

    const chengedEl = await db.query(
      `UPDATE ${table} SET ${culomn_3}=${newValue} WHERE ${culomn_1}=${id} RETURNING*`
    )
    return chengedEl.rows
  }
}

module.exports = Utilits