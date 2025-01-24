const request=require('request')

const forecast=(latitude,longitude,address,callback)=>{

    const requestURL=`http://api.weatherstack.com/forecast?access_key=cf837a8ce1e20d30944444d99ecc4224&query=${latitude},${longitude}&units=m`

    request({

        url:requestURL,

        json:true

    },
    (error,response)=>{
        const {error:highLevelError,current}=response.body
    if (error){
        callback("Unable to connect to the weather app service!")
    }

    else if (highLevelError){
        callback("Unable to find the location")
    }
    else{
        
        const {weather_descriptions,temperature,wind_speed}=current

        callback(null,weather_descriptions[0]+ ', '+`the temperature outside is ${temperature} degrees. The wind speed is ${wind_speed}`)
    }
    })
}

module.exports=forecast