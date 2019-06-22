module.exports = function (id, func, resStr, isAsync) {
  let prefix = ''
  if (isAsync) {
    prefix = `await `
  }
  return `_s${id} = ${prefix}_s${func}(${resStr});
  `
}