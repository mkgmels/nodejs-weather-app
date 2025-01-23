const request=require('request')

const getGeoCode= (city,callback)=>{



    const requestURL=`https://api.mapbox.com/search/geocode/v6/forward?region=${city}&limit=1&access_token=pk.eyJ1IjoibWtnbWVsczczIiwiYSI6ImNtNjVpcjZyejF2NmoyanNvc3o5cWlwNTgifQ.nG2teTf1YiBLHkBweJ2Tdg`

    request({

       url:requestURL,

       json:true

   },(error,response)=>{
       if (error){
        
          return callback("Unable to connect to the weatherstack app services!",null)
       }
       const {error_code,features}=response.body

       if (error_code){

        return callback(`${error_code}, unable to find the coordinates!`,null)
    }
       else if (features.length===0){

        return callback("There is no matching result, Please provide a correct address",null)
    }
       else{

            const {coordinates,full_address:address}=features[0].properties

            const {latitude,longitude}=coordinates

           callback(null,{

            latitude,

            longitude,

            address

           })
       }
   })
}


module.exports=getGeoCode
