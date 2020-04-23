class TinyDB {
    endpoint = '';
    database = '';
    user = '';
    pass = '';

    constructor(host, port, ssl=false) {
        this.endpoint = ['http'+(ssl?'s':'')+'://', host.toString(), ':', port.toString(), '/'].join('');
        return this;
    }

    auth(username, password) {
        this.user = username.toString();
        this.pass = password.toString();
        return this;
    }

    db(name) {
        this.database = name;
        return this;
    }

    async query(text) {
        let promise = await fetch(this.endpoint, {
            method: 'POST',
            body: text,
            headers: {
                'Authorization': btoa([this.user, this.pass].join('\0')),
                'Database': this.database.toString(),
            }
        });

        let json = await promise.json();

        if (json.hasOwnProperty('err')) {
            throw new Error(json['err'].toString());
        }

        return json['data'];
    }
}

if (typeof module != 'undefined') {
    var fetch = require('node-fetch');
    var btoa = require('btoa');
    module.exports = TinyDB;
}
