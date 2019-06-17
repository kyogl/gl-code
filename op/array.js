module.exports = function (id, func, resStr) {
  switch (func) {
    case 'push' :
      let res = resStr.split(',')[0]
      let res2 = resStr.split(',')[1]
      return `${res}.push(${res2});
      _s${id} = ${res};
      `
    default :
      return `_s${id} = new Array(${resStr});
      `
  }
}