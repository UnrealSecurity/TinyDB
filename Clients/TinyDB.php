<?php

	class TinyDB {
		private $endpoint = null;
		private $database = '';
		private $user = ''; 
		private $pass = '';
		
		function __construct($host, $port, $ssl=false) {
			$this->endpoint = 'http'.($ssl ? 's' : '').'://'.$host.':'.strval($port).'/';
		}
		
		function db($database) {
			$this->database = strval($database);
			return $this;
		}
		
		function auth($username, $password) {
			$this->user = strval($username);
			$this->pass = strval($password);
			return $this;
		}
		
		function query($text) {
			try {
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $this->endpoint);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($ch, CURLOPT_POST, 1);
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
				curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $text); 
				curl_setopt($ch, CURLOPT_HTTPHEADER, [
					'Database: '.$this->database,
					'Authorization: '.base64_encode(implode("\0",[$this->user,$this->pass])),
				]);
				$data = json_decode(curl_exec($ch));
				
				if (array_key_exists('data',$data) && !array_key_exists('err',$data)) {
					return $data->data;
				} else {
					throw new Error($data->err);
				}
			} catch (Exception $e) {
			}
			
			return null;
		}
	}
	
?>