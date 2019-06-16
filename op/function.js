module.exports = function (id, func) {
  switch (func) {
    case 'new' :
    default :
      return `_s${id} = function(data) {
      `
  }
}