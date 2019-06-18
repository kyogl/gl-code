const _ = require('lodash')

module.exports = function (id, func, resStr) {
  let str = _.map(resStr, r=>{
    return `${r.key}: ${r.value}`
  }).join(',')
  switch (func) {
    case 'new' :
    default :
      return `_s${id} = {${str}}
      `
  }
}