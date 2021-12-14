const clientForm = document.querySelector('form')
const email = document.querySelector('#emailinput')
const password = document.querySelector('#passwordinput')
const messageArea = document.querySelector('#messageArea')
const messageTwo = document.querySelector('#message-2')
const imagePlaceholder = document.querySelector('#imagePlaceholder')
const imageName = document.querySelector('#imageName')
const imageDescription = document.querySelector('#imageDescription')

// This file is responsible for the front end js code to display an image message to regular users


function loadImage(imageId) {  

    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token
    // here we ask the backend for the actual image message
    fetch('/image/'+imageId,{
        method: "GET",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
        .then( res => res.json() )
            .then( res => {
                const finalsrc = "data:"+res.contentType+";base64,"+res.data
                imagePlaceholder.src = finalsrc  
                imageName.textContent =res.name
                imageDescription.textContent = res.desc
                
            })
}

