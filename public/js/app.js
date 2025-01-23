const weatherForm= document.querySelector('form');
const message1=document.querySelector('.main-content > .address-result')
const message2=document.querySelector('.main-content > .weather-result')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const address=document.querySelector('input').value
    message1.textContent=''
    message2.textContent=''
    fetch(`http://localhost:3000/weather?address=${address}`).then((response)=>{
        response.json().then((data)=>{

            if(data.error){
                console.error(data.error)
                message1.textContent=data.error

            } else{
                message1.textContent=`Location : ${data.address}`
                message2.textContent=`Weather state : ${data.forecast}`

            }
        })
    })
})
