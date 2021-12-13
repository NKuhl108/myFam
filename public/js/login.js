const loginForm = document.querySelector('form')
const email = document.querySelector('#emailinput')
const password = document.querySelector('#passwordinput')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const emailaddress = email.value
    const passwd = password.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/users/login',{
        method: "POST",
        body: JSON.stringify({
            email: emailaddress,
            password: passwd
        }),
        headers: {  
            'Content-Type': 'application/json'
          }

      })
      
      
        .then( res => res.json() )
            .then( res => {
                if (!res.user){
                    messageOne.textContent ='Error logging in'
                }
                else{
                    let inMemoryToken = res.token;
                    messageOne.textContent ='User ' + ' successfully logged in!'
                    email.value=''
                    password.value=''
                    localStorage.setItem('user', JSON.stringify(res))
                    exitLink = '/messageList'
                    if (res.user.isAdmin == true){
                        exitLink = '/adminMessageList'
                    }
                    window.location.href = exitLink    
                }

            })

})