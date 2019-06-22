const lodash_map = require('lodash/map');
      const axios = require('axios');
      const _func = async function () {
    let _s1,_s2,_s2_await,_s2_5,_s3,_s4,_s5,_s6,_s7;
    _s1 = arguments
      _s2_await = axios.get("http://localhost:3000/api/graph/list",_s1[0]);
          _s2 = await _s2_await;
          _s2_5 = function() {
    _s4 = arguments
      _s5 = new Object({id: _s4[0]._id,name: _s4[0].title});
    _s6 = _s5;
          return _s6;
        };
            _s3 = lodash_map(_s2.data.data,_s2_5);
          _s7 = _s3;
          return _s7;
        };
    module.exports = _func