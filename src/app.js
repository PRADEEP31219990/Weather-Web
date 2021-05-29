const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
app.use(express.static(path.join(__dirname,'../public')))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.get('',(req,res) => {
    res.render('index',{
      title : 'Weather App',
      name :  'Amit Badhana'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
      title : 'About me',
      name :  'Amit Badhana'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
      helpText : 'This is some Helpful page ',
      title : 'Help'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
           if(error){
               return res.send({error})
           }
           res.send({
               forecast : forecastData,
               location,
               address : req.query.address
           })
      })
  })
})

    // res.send({
    //     location : "Philadelphia",
    //     forecast : "it is snowing",
    //     address : req.query.address
 

app.get('/help/*', (req,res) => {
    res.render('404',{
       title : '404 Help',
       name : 'Amit Badhana',
       errorMessage : 'Help article not found' 
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title : '404',
        name : 'Amit Badhana',
        errorMessage : 'Page not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port )
})


