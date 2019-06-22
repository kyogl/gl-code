const _ = require('lodash')

module.exports = function (id, func, resStr, isAsync) {
  func = _.upperFirst(func)
  if (func=='Function') {
    let prefix = ''
    if (isAsync) {
      prefix = `async `
    }
    return `_s${id} = ${prefix}function() {
    `
  } else if (func=='Object') {
    let str = _.map(resStr, r=>{
      return `${r.key}: ${r.value}`
    }).join(',')
    return `_s${id} = new ${func}({${str}});
    `
  } else {
    return `_s${id} = new ${func}(${resStr});
    `
  }
}