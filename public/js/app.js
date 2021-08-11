const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value
    message1.textContent = "loading...."
    message2.textContent = ""
    getWeather(location)
    //console.log(location)
})

function getWeather(params) {
    const url = `http://localhost:3000/weather?address=${params}`
    fetch(url).then((respnse) => {
        respnse.json().then((data) => {
            if (data.error) {
                message1.textContent = ""
                message2.textContent = data.error
                return
            }
            message1.textContent = data.location
            message2.textContent = data.forcast
        })
    })
}