const json = {
    "nodes":[
        {
            "id":"1",
            "type":"start"
        },
        {
            "id": "2",
            "type": "func",
            "package": "axios",
            "func": "get",
            "async": true,
            "data": {
                "index": 0,
                "value": "http://localhost:3000/api/graph/list"
            }
        },
        {
            "id": "2_5",
            "type": "global",
            "package": "new",
            "func": "function",
            "start": "4"
        },
        {
            "id": "3",
            "type": "func",
            "package": "lodash/map"
        },
        {
            "id": "4",
            "type": "start"
        },
        {
            "id": "5",
            "type":"global",
            "package": "new",
            "func": "object"
        },
        {
            "id": "6",
            "type":"return"
        },
        {
            "id": "7",
            "type":"return"
        }
    ],
    "links":[
        {
            "source":"1",
            "target":"2",
            "filter": "0"
        },
        {
            "source":"1",
            "target":"2_5"
        },
        {
            "source":"2_5",
            "target":"3",
            "index": 1
        },
        {
            "source":"2",
            "target":"3",
            "index":0,
            "filter": "data.data"
        },
        {
            "source":"3",
            "target":"7",
            "filterPrefix": "typeof",
            "index":0
        },
        {
            "source": "4",
            "target": "5",
            "index": "id",
            "filter": "0._id"
        },
        {
            "source": "4",
            "target": "5",
            "index": "name",
            "filter": "0.title"
        },
        {
            "source": "5",
            "target": "6",
            "index": 0
        }
    ]
}

module.exports = json