module.exports = function (id, func, resStr) {
  let x = resStr.split(',')[0]
  let y = resStr.split(',')[1]
  if (func=='forOf') {
    return `for (let _i${id} of ${x}) {
      _s${id} = ${y}(_i${id});
    };
    `
  } else if (func=='forAwaitOf') {
    return `for await (let _i${id} of ${x}) {
      _s${id} = ${y}(_i${id});
    };
    `
  } else if (func=='forIn') {
    return `for (let _i${id} in ${x}) {
      _s${id} = ${y}(_i${id});
    };
    `
  } else if (func=='doWhile') {
    return `do {
      _s${id} = ${y}(${x});
    } while (${x});
    `
  } else if (func=='while') {
    return `while (${x}) {
      _s${id} = ${y}(${x});
    };
    `
  } else {
    return `for (let _i${id}=0; _i${id}<${x}; _i${id}++) {
      _s${id} = ${y}(_i${id});
    };
    `
  }
}