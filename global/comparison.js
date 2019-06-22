module.exports = function (id, func, resStr) {
  let x = resStr.split(',')[0]
  let y = resStr.split(',')[1]
  return `_s${id} = ${x} ${func} ${y};
  `
}