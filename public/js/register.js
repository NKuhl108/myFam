const registerForm = document.querySelector('form')
const email = document.querySelector('#emailinput')
const password = document.querySelector('#passwordinput')
const usernameInput = document.querySelector('#nameinput')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const inmateCheckbox = document.querySelector('#inmate')

// This file handles the frontend js part of the registration page

// This gets called when the "Register" button is clicked.
registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // grab form data
    const emailaddress = email.value
    const passwd = password.value
    const username = usernameInput.value
    const inmateStatus = inmateCheckbox.checked
    messageOne.textContent = 'Loading...'

    // go to backend and hand over that form data to create user account
    fetch('/users',{
        method: "POST",
        body: JSON.stringify({
            name: username,
            email: emailaddress,
            password: passwd,
            inmate: inmateStatus
        }),
        headers: {  
            'Content-Type': 'application/json'
          }

      })
        .then( res => res.json() ) // display result now
            .then( res => {
                if (!res.user){
                    messageOne.textContent ="Error registering user"
                }
                else{
                    let inMemoryToken = res.token;
                    messageOne.textContent ='User ' + ' successfully registered!'
                    localStorage.setItem('user', JSON.stringify(res));
                    email.value=''
                    password.value=''
                    usernameInput.value=''
                    window.location.href = '/messageList'
               }

            })

})

