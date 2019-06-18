const lodash_map = require('lodash/map');
      const lodash_add = require('lodash/add');
      const func = async function (data) {
    let _s1,_s2,_s3,_s4,_s5,_s6,_s7,_s8,_s9,_s10,_s11,_s12,_s13,_s14,_s15,_s16,_s17,_s18,_s19,_s20;
    _s1 = data
      _s2 = lodash_add(_s1,2);
        _s3 = lodash_add(_s2,2);
        _s4 = lodash_add(_s2,2);
        _s5 = lodash_add(_s4,20);
        _s6 = lodash_add(_s3,_s5);
        _s7 = new Array(_s6);
      _s8 = function(data) {
      _s9 = data
      _s10 = lodash_add(_s9,_s6);
        _s11 = _s10;
          return _s11;
        };
            _s12 = lodash_map(_s7,_s8);
        if (_s12){
    _s13 = true;
  _s14 = lodash_add(_s13,_s6);
        _s16 = new Array();
      _s16.push(_s6);
      _s17 = _s16;
      } else {
            _s13 = false;
          _s15 = lodash_add(_s6);
        };
          _s18 = {name: _s17,waka: _s12}
      _s19 = _s18;
          return _s19;
        _s20 = [_s15,_s1];
          return _s20;
        };
    module.exports = func