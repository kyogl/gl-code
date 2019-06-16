const json = {
  "nodes":[
      {
          "id":"1",
          "type":"start"
      },
      {
          "id":"2",
          "data": [
            {
                index: 1,
                value: 2
            }
          ]
      },
      {
          "id":"3",
          "data": [
            {
                index: 1,
                value: 2
            }
          ]
      },
      {
          "id":"4",
          "data": [
            {
                index: 1,
                value: 2
            }
          ]
      },
      {
          "id":"5",
          "data": [
            {
                index: 1,
                value: 2
            }
          ]
      },
      {
          "id":"6"
      },
      {
          "id":"7",
          "data": [
            {
                index: 1,
                value: 2
            }
          ]
      },
      {
          "id":"8",
          "type":"echo"
      }
  ],
  "links":[
      {
          "source":"1",
          "target":"2",
          "index": 0
      },
      {
          "source":"2",
          "target":"3",
          "index": 0
      },
      {
          "source":"2",
          "target":"4",
          "index": 0
      },
      {
          "source":"4",
          "target":"5",
          "index": 0
      },
      {
          "source":"3",
          "target":"6",
          "index": 0
      },
      {
          "source":"5",
          "target":"6",
          "index": 1
      },
      {
          "source":"6",
          "target":"7",
          "index": 0
      },
      {
          "source":"7",
          "target":"8"
      }
  ]
}

module.exports = json