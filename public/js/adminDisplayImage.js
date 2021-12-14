const clientForm = document.querySelector('form')
const deleteForm = document.querySelector('#deleteForm')
const undeleteForm = document.querySelector('#undeleteForm')
const imagePlaceholder = document.querySelector('#imagePlaceholder')
const imageName = document.querySelector('#imageName')
const imageDescription = document.querySelector('#imageDescription')

// This is the front end part of displaying an image message to administrators


let currentImageId=0 // remember image id here because we need it for operations delete/restore


// This function gets called form the handlebars file. We pass the image id
function loadImage(imageId) {  
    currentImageId=imageId
    //get local token so we can put it into the header of the request we send to the backend
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token

    // now get that image from the database
    fetch('/image/'+imageId,{
        method: "GET",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
        .then( res => res.json() )
            .then( res => {
                //after getting image data back, display image by putting it straight into the <img> tag like this here:
                const finalsrc = "data:"+res.contentType+";base64,"+res.data
                imagePlaceholder.src = finalsrc  
                imageName.textContent =res.name
                imageDescription.textContent = res.desc
                
            })
}



//this happens when admin presses delete. Send HTTP "DELETE" request to backend
//->backend sets 'isDeleted' property
deleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
 
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token

    fetch('/image/'+currentImageId,{
        method: "DELETE",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
      .then( res => {
            window.location.href = '/adminImageList'
      })
})

//this happens when admin presses restore
//->backend sets 'isDeleted' property
undeleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
 
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token

    fetch('/image/'+currentImageId,{
        method: "PATCH",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
      .then( res => {
            window.location.href = '/adminImageList'
      })
})