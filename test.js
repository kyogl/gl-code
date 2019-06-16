const lodash = require('lodash');
      const func = async function (data) {
    let _s1,_s2,_s3,_s4,_s5,_s6,_s7,_s8,_s9,_s10,_s11,_s12,_s13;
    _s1 = data
      _s2 = lodash.add(_s1,2);
        _s3 = lodash.add(_s2,2);
        _s4 = lodash.add(_s2,2);
        _s5 = lodash.add(_s4,2);
        _s6 = lodash.add(_s3,_s5);
        _s7 = new Array(_s6);
      _s8 = function(data) {
      _s9 = data
      _s10 = lodash.add(2,_s9);
        return _s10
      };
            _s12 = lodash.map(_s7,_s8);
        return _s12
      };
    module.exports = func