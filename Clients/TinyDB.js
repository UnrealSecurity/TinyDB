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

/*

NODE.JS DEPENDENCIES:

    npm install btoa node-fetch

EXAMPLE CODE:

    let db = new TinyDB('127.0.0.1', 1338)
        .db('dev').auth('root', 'toor');

    try {
        let data = await db.query(`
            DROP TABLE users
            CREATE TABLE users [UNIQUE id, TEXT username, TEXT email, BOOL admin]
            INSERT INTO users VALUES [0, 'HeapOverride', 'arran.bishop89@aol.com', true]
            INSERT INTO users VALUES [0, 'UnknownUser', 'unknown.user@example.com', false]
            SELECT * FROM users
            SELECT * FROM users WHERE username LIKE 'heap'
            LIST TABLES
            DROP TABLE users
        `);

        console.log(data);
    } catch (err) {
        console.error(err.toString());
    }

*/