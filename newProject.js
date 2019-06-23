const fs = require('fs')

const create = function (name) {
  fs.mkdir(`./project/${name}`,function(err){
    if (err) {
        return console.error(err);
    }
    console.log("目录创建成功");
    const packageJson = {
      "name": "@glcode/"+name,
      "version": "1.0.0",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "license": "ISC"
    };
    fs.writeFile(`./project/${name}/package.json`, JSON.stringify(packageJson, null, 2),  function(err) {
      if (err) {
          return console.error(err);
      }
      console.log("Package.json创建成功");
    });
  })
}

create('kyo')
