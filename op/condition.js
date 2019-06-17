module.exports = function (id, func, resStr) {
  let s = '&'
  if (func=='any') {
    s = '||'
  }
  resStr = resStr.split(',').join(s)
  return `_s${id} = [${resStr}]
  if (${resStr}){
  `
}