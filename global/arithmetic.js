module.exports = function (id, func, resStr) {
  let res = resStr.split(',').join(func)
  return `_s${id} = ${res};
  `
}