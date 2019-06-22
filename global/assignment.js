module.exports = function (id, func, resStr) {
  let x = resStr.split(',')[0]
  let y = resStr.split(',')[1]
  return `${x} = ${y};
  _s${id} = [${resStr}];
  `
}