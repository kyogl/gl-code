module.exports = function (id, func, resStr) {
  if (func=='all') {
    return `${resStr};
    `
  } else {
    return `_s${id} = ${resStr};
    `
  }
}