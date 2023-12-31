const emitter = require('../emmiter/emmiter')

function getLog(value) {
  emitter.emit('here', value)
}

module.exports = getLog