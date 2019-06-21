module.exports = function (id, func, resStr) {
  let res = resStr.split(',')[0]
  let res2 = resStr.split(',')[1]
  switch (func) {
    case 'push' :
      return `${res}.push(${res2});
      _s${id} = ${res};
      `
    case 'unshift' :
      return `${res}.unshift(${res2});
      _s${id} = ${res};
      `
    case 'join':
      return `_s${id} = ${res}.join(${res2});
      `
    default :
      return `_s${id} = new Array(${res});
      `
  }
}