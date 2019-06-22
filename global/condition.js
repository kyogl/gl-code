module.exports = function (id, func, resStr) {
  let s = '&'
  if (func=='any') {
    s = '||'
  }
  resStr = resStr.split(',').join(s)
  return `if (${resStr}){
    _s${id} = true;
  `
}