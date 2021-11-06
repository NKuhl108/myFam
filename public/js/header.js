// This little javascript file shows the link to send picture messages ONLY to non-inmates
// (of course in addition we need to check on the backend)

const imageLink = document.querySelector('#sendImageLink')


const localstorage_user = JSON.parse(localStorage.getItem('user'))
const inMemoryToken = localstorage_user.token
console.log(localstorage_user.user.inmate)
if (localstorage_user.user.inmate == false){
   
    imageLink.setAttribute('href', '/sendImage');
    imageLink.innerHTML = 'Send Picture Message'
}
else{
    imageLink.remove()
}