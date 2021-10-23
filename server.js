require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const mongoose = require('mongoose');
const services = require('./services/')
const PORT = process.env.PORT;

console.log("Attempting to connect to database..")
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true }
    )
.then(()=>{
    main()
}).catch(()=>{
    console.log("Failed to connect to database")
})

const db = mongoose.connection
db.on("error", error=> console.error("Mongo Error: "+error))
db.once("open", ()=> {
        console.log("Database Connection Established on "+process.env.DATABASE_URL)
});

function main(){
    app.listen(PORT, function(){
        console.log("Server running on port "+PORT);
        setInterval(services.fetchGasPrices, 5000)
    })
}

app.get("/", (req,res)=>{
    res.status(200).send(`Server running on port ${PORT}`)
})

const routes = require('./routes/')
app.use('/', routes);
//everything in '/routes/index.js' is exposed and accessible directly from root unless otherwise specified. 
