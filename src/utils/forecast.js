const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=23aaf51d5c0c59f0e56445b09d754511&query=' + latitude + "," + longitude + '&units=f'
    request({url , json : true}, (error,{body} = {}) => {
          if(error){
              callback('Unable to connect to weather service',undefined)
          }else if(body.error){
              callback('unable to find location.',undefined)
          }else{
              callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It is feel like ' + body.current.feelslike + ' degrees out' )
          }
    })
}

module.exports = forecast 




