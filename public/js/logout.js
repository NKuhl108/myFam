const logoutOneForm = document.querySelector('#logoutoneform')
const logoutAllForm = document.querySelector('#logoutallform')

const email = document.querySelector('#emailinput')
const password = document.querySelector('#passwordinput')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

function displayLogoutSuccess() {
    alert("Logout successful");
  }

  // calling /users/logout checks the token and then just deleted that token from
  // the token list of that user -> the current session is invalid
  logoutOneForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token
    fetch('/users/logout',{
        method: "POST",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
        .then( ()=>{
            alert("Logout successful");
            localStorage.clear();
            window.location.href = '/login' 
            }
        )
})

// calling /users/logoutAll checks the token and then deletes the entire token list of this user.
// -> all login tokens are invalid.
logoutAllForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token
    fetch('/users/logoutAll',{
        method: "POST",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
        .then( ()=>{
            alert("Logout successful");
            localStorage.clear();
            window.location.href = '/login' 
            }
        )
})

