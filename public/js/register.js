const registerForm = document.querySelector('form')
const email = document.querySelector('#emailinput')
const password = document.querySelector('#passwordinput')
const usernameInput = document.querySelector('#nameinput')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const inmateCheckbox = document.querySelector('#inmate')

registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const emailaddress = email.value
    const passwd = password.value
    const username = usernameInput.value
    const inmateStatus = inmateCheckbox.checked
    messageOne.textContent = 'Loading...'

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
      
      
        .then( res => res.json() )
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

