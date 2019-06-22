module.exports = function (id, func, resStr, isAsync) {
  if (isAsync) {
    return `let _s${id}_await = ${func}(${resStr});
    _s${id} = await _s${id}_await;
    `
  } else {
    return `_s${id} = _s${func}(${resStr});
    `
  }
}