import json
import requests
import base64

class TinyDB:
    endpoint = ''
    database = ''
    username = ''
    password = ''
    
    def __init__(self, host, port, ssl=False):
        self.endpoint = 'http'+('s' if ssl else '')+'://'+host+':'+str(port)+'/'
    
    def db(self, database):
        self.database = database
        return self
        
    def auth(self, username, password):
        self.username = username
        self.password = password
        return self
        
    def query(self, text):
        headers = {
            'Content-Type': 'text/plain',
            'Database': self.database,
            'Authorization': base64.b64encode((self.username+'\0'+self.password).encode('utf-8')).decode('utf-8'),
        }
        
        res = requests.post(self.endpoint, text, headers=headers)
        obj = json.loads(res.text)
        
        if 'err' in obj:
            raise Exception(obj['err'])
            
        return obj['data'];