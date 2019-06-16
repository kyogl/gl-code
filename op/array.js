module.exports = function (id, func, resStr) {
  switch (func) {
    case 'new' :
    default :
      return `_s${id} = new Array(${resStr});
      `
  }
}