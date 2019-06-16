const _ = require('lodash');
    const add = function (a, b) {
      return new Promise(function(solve, reject) {
        setTimeout(()=>{
          let sult = _.add(a, b);
          solve(sult);
        }, 10);
      });
    };
    const func = async function (data) {
    let s1,q1,s2,q2,s3,q3,s4,q4,s5,q5,s6,q6,s7,q7,s8,q8;
    s1 = data
      s2 = await add(s1,3);
      s3 = await add(s2,4);
      s4 = await add(s2,4);
      s6 = await add(s4,1);
      s5 = await add(s3,6);
      s7 = await add(s5,6);
      return s7
      };
    module.exports = func