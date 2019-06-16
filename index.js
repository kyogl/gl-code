const fs = require('fs')
const _ = require('lodash')
const getGraph = require('./utils/getGraph')
const build = require('./utils/build')
const json = require('./graph')
const graph = getGraph(json)

class Runtime {
  constructor(graph) {
    this.graph = graph
    this.tryRun = {}
    this.log = {}
    this.code = `const _ = require('lodash');
    const add = function (a, b) {
      return new Promise(function(solve, reject) {
        setTimeout(()=>{
          let sult = _.add(a, b);
          solve(sult);
        }, 10);
      });
    };
    const func = async function (data) {
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
      this.code += `s${id} = data
      `
    } else if (node.type=='echo') {
      let link = this.getLink(node.targetLinks[0])
      let parent = this.getNode(link.source)
      this.code += `return s${parent.id}
      `
    } else {
      let link = this.getLink(node.targetLinks[0])
      let parent = this.getNode(link.source)
      let arg = _.random(1,9)
      this.code += `s${id} = await add(s${parent.id},${arg});
      `
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
      this.runNode(link.target)
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
    let nodeIds = _.map(this.graph.nodes, node=>{
      return `s${node.id},q${node.id}`
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
      // build()
    });
  }
}

const runtime = new Runtime(graph)
runtime.run()







