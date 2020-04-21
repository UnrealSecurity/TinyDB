# Client modules to interact with TinyDB server

### JavaScript
This also works in browsers though you probably don't want to expose your credentials (depends).
Node.js dependencies: btoa, node-fetch
```js
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
```

### PHP
```php
<?php

	include('TinyDB.php');
	
	$db = new TinyDB('router.unrealsec.eu', 1338);
	$db->db('unrealsec')->auth('readonly', 'readonly');
	
	$results = $db->query("SELECT * FROM badips WHERE countryCode IS 'fi'");
	echo '<pre>'.print_r($results, true).'</pre>';

?>
```

### Python
```python
from TinyDB import TinyDB

db = TinyDB('router.unrealsec.eu', 1338)
db.auth('readonly', 'readonly')
db.db('unrealsec')

print(db.query("SELECT * FROM badips WHERE countryCode IS 'fi'"))
```
