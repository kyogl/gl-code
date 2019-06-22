const fs = require('fs')
const _ = require('lodash')
const getGraph = require('./utils/getGraph')
const build = require('./utils/build')
const json = require('./graph')
const global = require('./global')
const graph = getGraph(json)

class Runtime {
  constructor(graph) {
    this.graph = graph
    this.tryRun = {}
    this.log = {}
    this.code = `const _func = async function () {
    `;
  }
  getNode (id) {
    let nodeIndex = this.graph.nodeIndex[id]
    let node = this.graph.nodes[nodeIndex]
    return node
  }
  getLink (id) {
    let linkIndex = this.graph.linkIndex[id]
    let link = this.graph.links[linkIndex]
    return link
  }
  buildNode (id) {
    let node = this.getNode(id)
    if (node.type=='start') {
      this.code += `_s${id} = arguments
      `
    } else {
      if (node.data) {
        this.log[id] = _.concat(this.log[id], node.data)
      }
      _.remove(this.log[id], log=>{
        return log.index<0
      })
      this.log[id] = _.orderBy(this.log[id], ['index'], ['asc'])
      // console.log(this.log[id])
      let res, resStr
      if (node.type=='global' && node.package=='new' && node.func=='object') {
        resStr = _.map(this.log[id], log=>{
          let value
          if (log.key) {
            value = log.key
          } else {
            value = _.isNumber(log.value) ? log.value : JSON.stringify(log.value)
          }
          return {
            key: log.index,
            value
          }
        })
      } else if (node.type=='global' && node.package=='sentence') {
        resStr = _.map(_.filter(this.log[id], log=>{
          return log.value
        }), log=>{
          return log.value
        })[0]
      } else {
        res = _.map(this.log[id], log=>{
          if (log.key) {
            return log.key
          }
          return _.isNumber(log.value) ? log.value : JSON.stringify(log.value)
        })
        resStr = res.join(',')
      }
      if (node.type=='return') {
        if (res.length>1) {
          this.code += `_s${id} = [${res}];
          `
        } else {
          this.code += `_s${id} = ${res[0]};
          `
        }
        this.code += `return _s${id};
        `
      } else if (node.type=='func') {
        let func = node.package
        if (node.package.indexOf('/')>0) {
          func = node.package.split('/').join('_')
        }
        if (node.func) {
          func += `.${node.func}`
        }
        if (node.async) {
          this.code += `_s${id}_await = ${func}(${resStr});
          _s${id} = await _s${id}_await;
          `
        } else {
          this.code += `_s${id} = ${func}(${resStr});
          `
        }
      } else if (node.type=='global') {
        this.code += global[node.package](id, node.func, resStr, node.async)
        if (node.package=='new') {
          if (node.func=='function') {
            this.runNode(node.start)
            this.code += `};
            `
          }
        } else if (node.package=='condition') {
          this.runNext(node.id, true)
          this.code += `} else {
            _s${node.id} = false;
          `
          this.runNext(node.id, false)
          this.code += `};
          `
        }
      }
    }
  }
  runNext (id, condition) {
    let node = this.getNode(id)
    if (node.sourceLinks.length==0) {
      return
    }
    let sourceLinks = node.sourceLinks
    if (condition===true || condition===false) {
      sourceLinks = _.filter(node.sourceLinks, linkId=>{
        let link = this.getLink(linkId)
        return link.condition===condition
      })
    }
    _.forEach(sourceLinks, linkId=>{
      let link = this.getLink(linkId)
      let target = link.target
      if (!_.isArray(this.log[target])) {
        this.log[target] = []
      }
      let log = {
        key: `_s${link.source}`,
        index: link.index
      }
      if (link.filter) {
        let filters = _.map(link.filter.split('.'), n=>{
          if (n*1>=0) {
            return `[${n*1}]`
          } else {
            return `.${n}`
          }
        })
        log.key += filters.join('')
      }
      this.log[target].push(log)
      this.runNode(target)
    })
  }
  runNode (id) {
    let node = this.getNode(id)
    if (!_.isObject(this.log[id])) {
      this.log[id] = {}
    }
    if (!this.tryRun[id]) {
      this.tryRun[id] = _.after(node.targetLinks.length, ()=>{
        this.buildNode(id)
        if (node.type=='global' && node.package=='condition') {
          return
        }
        this.runNext(id)
      })
    }
    this.tryRun[id]()
  }
  run () {
    let nodePackage = _.uniq(_.map(_.filter(this.graph.nodes, node=>{
      return node.type=='func'
    }), node=>{
      return node.package
    }))
    _.forEach(nodePackage, pkg=>{
      let name = pkg.split('/').join('_')
      this.code = `const ${name} = require('${pkg}');
      `+this.code
    })
    //声明变量
    let nodeIds = _.map(this.graph.nodes, node=>{
      if (node.async && (node.type=='func' || (node.type=='global' && node.package=='function'))) {
        return `_s${node.id},_s${node.id}_await`
      } else {
        return `_s${node.id}`
      }
    })
    let nodeStr = nodeIds.join(',')
    this.code += `let ${nodeStr};
    `
    this.runNode(this.graph.start);
    this.code += `};
    module.exports = _func`
    console.log(this.code);
    fs.writeFile('test.js', this.code,  function(err) {
      if (err) {
          return console.error(err);
      }
      build()
    });
  }
}

const runtime = new Runtime(graph)
runtime.run()