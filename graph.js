const json = {
    "let":[
        {
            "key": "list",
            "value": []
        }
    ],
    "nodes":[
        {
            "id":"1",
            "type":"start"
        },
        {
            "id":"2",
            "type":"func",
            "package":"lodash/add",
            "data":[
                {
                    "index":1,
                    "value":2
                }
            ]
        },
        {
            "id":"3",
            "type":"func",
            "package":"lodash/add",
            "data":[
                {
                    "index":1,
                    "value":2
                }
            ]
        },
        {
            "id":"4",
            "type":"func",
            "package":"lodash/add",
            "data":[
                {
                    "index":1,
                    "value":2
                }
            ]
        },
        {
            "id":"5",
            "type":"func",
            "package":"lodash/add",
            "data":[
                {
                    "index":1,
                    "value":2
                }
            ]
        },
        {
            "id":"6",
            "type":"func",
            "package":"lodash/add"
        },
        {
            "id":"7",
            "type":"op",
            "package":"array",
            "func":"new"
        },
        {
            "id":"8",
            "type":"op",
            "package": "function",
            "func": "new",
            "start": "9"
        },
        {
            "id": "9",
            "type": "start",
            "parent":"8"
        },
        {
            "id":"10",
            "type":"func",
            "package":"lodash/add",
            "parent":"8",
            "data":[
                {
                    "index":1,
                    "value":2
                }
            ]
        },
        {
            "id":"11",
            "parent": "8",
            "type":"return"
        },
        {
            "id":"12",
            "type":"func",
            "package": "lodash/map"
        },
        {
            "id":"13",
            "type":"return"
        }
    ],
    "links":[
        {
            "source":"1",
            "target":"2",
            "index":0
        },
        {
            "source":"2",
            "target":"3",
            "index":0
        },
        {
            "source":"2",
            "target":"4",
            "index":0
        },
        {
            "source":"4",
            "target":"5",
            "index":0
        },
        {
            "source":"3",
            "target":"6",
            "index":0
        },
        {
            "source":"5",
            "target":"6",
            "index":1
        },
        {
            "source":"6",
            "target":"7",
            "index":0
        },
        {
            "source":"1",
            "target":"8",
        },
        {
            "source":"7",
            "target":"12",
        },
        {
            "source": "8",
            "target": "12",
        },
        {
            "source": "9",
            "target": "10",
        },
        {
            "source": "10",
            "target": "11",
        },
        {
            "source": "12",
            "target": "13",
        }
    ]
}

module.exports = json