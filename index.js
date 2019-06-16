const fs = require('fs')
const _ = require('lodash')
const getGraph = require('./utils/getGraph')
const build = require('./utils/build')
const json = require('./graph')
const op = require('./op')
const graph = getGraph(json)

class Runtime {
  constructor(graph) {
    this.graph = graph
    this.tryRun = {}
    this.log = {}
    this.code = `const func = async function (data) {
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
      this.code += `_s${id} = data
      `
    } else if (node.type=='return') {
      let link = this.getLink(node.targetLinks[0])
      let parent = this.getNode(link.source)
      this.code += `return _s${parent.id}
      `
    } else {
      if (node.data) {
        this.log[id] = _.concat(this.log[id], node.data)
      }
      this.log[id] = _.orderBy(this.log[id], ['index'], ['asc'])
      let res = _.map(this.log[id], log=>{
        if (log.key) {
          return log.key
        }
        return _.isNumber(log.value) ? log.value : JSON.stringify(log.value)
      })
      let resStr = res.join(',')
      if (node.type=='func') {
        let prefix = ''
        if (node.async) {
          prefix = `await `
        }
        this.code += `_s${id} = ${prefix}${node.package}.${node.func}(${resStr});
        `
      } else if (node.type=='op') {
        this.code += op[node.package](id, node.func, resStr)
        if (node.package=='function') {
          if (node.func=='new') {
            this.runNode(node.start)
            this.code += `};
            `
          }
        }
      }
    }
  }
  runNext (id) {
    let node = this.getNode(id)
    if (node.sourceLinks.length==0) {
      return
    }
    let sourceLinks = node.sourceLinks
    _.forEach(sourceLinks, linkId=>{
      let link = this.getLink(linkId)
      let target = link.target
      if (!_.isArray(this.log[target])) {
        this.log[target] = []
      }
      this.log[target].push({
        index: link.index,
        key: `_s${link.source}`
      })
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
      this.code = `const ${pkg} = require('${pkg}');
      `+this.code
    })
    //声明变量
    let nodeIds = _.map(this.graph.nodes, node=>{
      return `_s${node.id}`
    })
    let nodeStr = nodeIds.join(',')
    this.code += `let ${nodeStr};
    `
    this.runNode(this.graph.start);
    this.code += `};
    module.exports = func`
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