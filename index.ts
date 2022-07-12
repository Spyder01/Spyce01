import Spyce from "./Spyce";




const spyce = Spyce (3000);

const api = spyce.createAPI("/api");

api.request ("/", {
    GET: (req, res) => {
        res.send("Hello World");
    }
});




spyce.listen (()=>console.log ("Server running on port: ", spyce.getPort ()));