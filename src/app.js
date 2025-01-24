//Imports
const path=require('path')

const express=require('express')

const hbs=require('hbs')

const forecast=require('./utils/forecast.js')

const geocode=require('./utils/geocode.js')

//Define paths for express config

const viewsPath=path.join(__dirname,"../templates/views")

const publicDirectoryPath=path.join(__dirname,"../public")

const partialsPath=path.join(__dirname,"../templates/partials")

app=express()

//setting up handlebars engine anda views location
app.set("view engine","hbs")

app.set("views",viewsPath)

hbs.registerPartials(partialsPath)

//Setting up a static directory to serve
app.use(express.static(publicDirectoryPath))

const port = process.env.PORT || 3000;

app.get('',(req,res)=>{
    res.render("../views/index.hbs",{
        title:"Weather",
        name:"Mohamed Khaled"
    })
})

app.get('/about',(req,res)=>{
    res.render('../views/about.hbs',{
        title:"About",
        name: "Fetihler sultani"
    })
})

app.get('/help',(req,res)=>{
    res.render('../views/help.hbs',{
        message:"Welcome to the help page",
        title:"Help",
        name:"Mohamed Khaled"
    })
})

app.get('/weather',(req,res)=>{
    const city=req.query.address
    if (!city){
       return res.send({
            error:"please enter an address"
        })
    } else {
        geocode(encodeURIComponent(city),(error,forecastData)=>{
            if (error){
                 res.send({
                    error:error
                })
            }
            else {
                const {latitude=0,longitude=0,address=''}=forecastData
        
                forecast(latitude,longitude,address,(error,forecastData)=>{
                    
                    if (error){
        
                        return res.send({
                            error:error
                        })
        
                    } else{
                        res.send({
                            address:city,
                            forecast:forecastData
                        })
        
                        /* res.render('../views/weather.hbs',{
                            address:city,
                            forecast:forecastData
                        }) */
                    }
                })
            }

            }
        
        )

    }
})
    
    

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error:"You must enter the search value"
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render("../views/error404.hbs",{
        title:"help page error 404",
        message:"Help article not found",
        name:"Mohamed Khaled"

    })
})

app.get('*',(req,res)=>{
    res.render("../views/error404.hbs",{
        title:"error 404",
        message:"Page not found",
        name:"Mohamed Khaled"
    })
})

app.listen(port,()=>{
    console.log(`The server is listening to port ${port}`)
})
