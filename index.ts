import Spyce from "./Spyce";




const spyce = Spyce (3000);

const api = spyce.createAPI("/api");

api.request ("/", {
    GET: (req, res) => {
        res.send("Hello World");
    }
});

const model = spyce.model({
    dialect: "mongo",
    uri: "mongodb+srv://MiniProject:SuhanBhavithaMiniProjectTeam123@cluster0.v4vzz.mongodb.net/?retryWrites=true&w=majority",
})





spyce.listen (()=>console.log ("Server running on port: ", spyce.getPort ()));