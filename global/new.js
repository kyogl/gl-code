const _ = require('lodash')

module.exports = function (id, func, resStr) {
  func = _.upperFirst(func)
  if (func=='Function') {
    return `_s${id} = function() {
    `
  } else if (func=='AsyncFunction') {
    return `_s${id} = async function() {
    `
  } else {
    return `_s${id} = new ${func}(${resStr});
    `
  }
}