using System;
using System.Collections.Generic;
using System.Text;
using System.Net;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;

class TinyDB
{
    private string endpoint = "";
    private string database = "";
    private string user = "";
    private string pass = "";

    public string Database { get { return database; } set { database = value; } }
    public string Username { get { return user; } set { user = value; } }
    public string Password { get { return pass; } set { pass = value; } }

    public TinyDB(string host, int port, bool ssl = false)
    {
        this.endpoint = String.Concat("http"+(ssl?"s":"")+"://", host, ":", port, "/");
    }

    public JArray Query(string text)
    {
        WebRequest req = HttpWebRequest.Create(this.endpoint);
        req.Method = "POST";
        req.Headers.Add("Database", this.database);
        req.Headers.Add("Authorization", Convert.ToBase64String(Encoding.UTF8.GetBytes(String.Join("\0", this.user, this.pass))));
        StreamWriter writer = new StreamWriter(req.GetRequestStream());
        writer.Write(text); writer.Close();

        WebResponse res = req.GetResponse();
        StreamReader reader = new StreamReader(res.GetResponseStream());
        JObject data = JObject.Parse(reader.ReadToEnd());

        if (data.ContainsKey("err")) throw new Exception(data.GetValue("err").ToString());
        return (JArray)data.GetValue("data");
    }
}
