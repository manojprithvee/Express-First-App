//Modules Imported
const express = require("express");
const hbs = require("hbs")
const fs = require("fs")
//Heroku Port
const port = process.env.PORT || 3000
//Exprees and hbsconfig
app = express();
app.set("view engine",'hbs');
hbs.registerPartials(__dirname + "/views/partials");
// hbs helpers 
hbs.registerHelper("getCurrentYear",()=>{
    return new Date().getFullYear()
})
hbs.registerHelper("screamIt",(text)=>{
    return text.toUpperCase()
})
//Express Middlewares

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    fs.appendFile("server.log",log+"\n",(err)=>{
        if (err){
        console.log("Log File Error "+err)
        }
    })
    console.log(log)
    next();
})
// app.use((req,res,next)=>{
//     res.render("maintenance.hbs",{
//         Title:"Under Maintenance"
//     })
// })
app.use(express.static(__dirname + "/public"));
//Express get functions
app.get("/", (req, res) => {
    // res.send("<b>manoj</b>")
    // res.send({
    //     name :"manoj",
    //     time:"8765t"
    // })
    res.render("home.hbs",{
        PageTitle:"Welcome To First NodeJS Template",
        Title:"Welcome",
    })
});

app.get("/about",(req,res)=>{
    // res.send("about page")
    res.render("about.hbs",{
        PageTitle :"About Page",   
    })
});
app.get("/bad",(req,res)=>{
    res.send({errorMessage:"test"})
})
//Express Bind
app.listen(port,()=>{
    console.log("Server is up on  http://localhost:3000")
})