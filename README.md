![TinyDB](https://i.ibb.co/LCjvLjr/tinydb2.png)

TinyDB is my own DBMS. You send queries and get JSON data in return. 
**It uses it's own query language which is very similar to SQL.** 
Database users need to have certain permissions to perform certain actions such as create tables, 
insert data to table or read data from table etc...

**Server is not in Github just yet, however you can try to connect to my test instance.**
```yaml
Host:        router.unrealsec.eu
Port:        1338
Database:    guests
User:        guest
Pass:        guest

You have all permissions except administrator (A) meaning 
that you cannot create/delete databases or users.

Please do not store sensitive information here as it can be accessed by another user!
This is a test server so do not assume it is reachable at all times.
```

## Query Language
Queries are separated with new line (\n) and semicolon (;)

#### Create new database with it's own users and tables.
```sql
CREATE DATABASE name
```
#### Create new user to existing database. Asterisk (\*) can be used to grant all permissions.
```sql
CREATE USER username, password, permissions IN database
```
#### Change current user's password.
```sql
SET PASSWORD password
```
#### Create new table with provided column types and names.
```sql
CREATE TABLE members [UNIQUE id, TEXT username, PASSWORD password, TEXT first_name, TEXT last_name, LONG member_since]
```
#### Insert new row to table. You have to provide value for every column (this might change in the future).
```sql
INSERT INTO members VALUES [0, 'HeapOverride', '12345', 'Arran', 'Bishop', 1587076575533] KEY username
```
#### Select and return data from table.
```sql
SELECT * FROM members WHERE username IS 'HeapOverride' AND password IS HASH('12345') LIMIT 1
SELECT first_name, last_name FROM members FROM members RANGE [COUNT(members, -25), COUNT(members)]
```
#### Delete/drop database (this cannot be undone).
```sql
DROP DATABASE database
```
#### Delete/drop table in current database (this cannot be undone).
```sql
DROP TABLE table
```
#### Delete matching rows from the table.
```sql
DELETE FROM members WHERE last_active < TIME(-31556952000) AND country NOT 'Finland'
```
#### Update column values in table where condition is met.
```sql
UPDATE email IN members WHERE username == 'HeapOverride' ['arran.bishop89@aol.com'] LIMIT 1
UPDATE username, email IN members WHERE username == 'HeapOverride' ['Old name is boring', 'arran.bishop89@aol.com'] LIMIT 1
```
#### List all tables in current database.
```sql
LIST TABLES
```
#### List all databases on server.
```sql
LIST DATABASES
```
#### Get table's column names
```sql
HEAD table
```
#### Get result of a function or just echo back string etc...
```sql
GET HASH('hash me')
GET COUNT(members)
```
#### Move source table to destination table (cannot move to existing table)
```sql
MOVE TABLE members TO members_backup
```
#### Move source database to destination database (cannot move to existing database)
```sql
MOVE DATABASE src_database TO dest_database
```
#### Copy source table to destination table (cannot move to existing table, source table will not be deleted)
```sql
COPY TABLE members TO members_backup
```
#### Copy source database to destination database (cannot move to existing database, source database will not be deleted)
```sql
COPY DATABASE src_database TO dest_database
```

## Data types
```
UNIQUE        - Table has a counter and this value is increased by one every time data is inserted to table. Works like MySQL's AUTO INCREMENT)
PASSWORD      - Column with this type is hashed with TinyDB's password hashing algorithm (SHA-256[salt + password])
TEXT          - String value (Hello world!)
INT           - Integer value
DOUBLE        - Double value (45.99)
BOOL          - Boolean value (true, false)
```

## Logical operators
```
IS       |   ==
NOT      |   !=
         |   >=
         |   <=
         |   >
         |   <
END      |   
BEGIN    |   
LIKE     |   
HAS      |   

AND      |   
OR       |
```

## Functions

#### Return table's row count.
```sql
COUNT(table)
```
#### Return milliseconds from the unix epoch (unix timestamp). This function takes min 0 parameter and max 1 parameter. Provided number will be added to the returned timestamp value.
```sql
TIME()
TIME(-1000)
```
#### Return hashed string for string
**Use case:** when comparing passwords in SELECT clause.
```sql
HASH('Hello world!')
```

## Permissions
```
N - create      X - delete
R - read        A - admin
W - write
```

## About LIMIT, RANGE and KEY
- **``KEY columnName``** can be used with INSERT clause to prevent inserting two identical columns already in the table.
- **``LIMIT n``** can be used with SELECT, DELETE and UPDATE clauses to exit after n succesful operations.
- **``RANGE [0, 100]``** can be used with SELECT, DELETE and UPDATE to limit operation to certain part within the table.
