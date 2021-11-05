const newMessageForm = document.querySelector('form')
const recipientEmailInput = document.querySelector('#recipientEmailInput')
const subjectInput = document.querySelector('#subjectInput')
const contentInput = document.querySelector('#contentInput')
const messageOne = document.querySelector('#message-1')
const emailDropDown = document.querySelector('#friendEmails')


function populateFriendList() { 
    emailArray=[]

    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token
    fetch('/users/friends',{
        method: "GET",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
        .then( res => res.json() )
        .then( res => {
            res.forEach(element => {
                emailArray.push(element.email)

                    // now emailArray populated
                emailDropDown.innerHTML=''
                emailArray.forEach( (element)=>{
                var newOption = document.createElement("option");
                newOption.value = element
                newOption.text = element
                emailDropDown.appendChild(newOption);
                })

            })

        })


}
newMessageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const recipientEmail = emailDropDown.value
    const subject= subjectInput.value
    const content = contentInput.value
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token
    
    fetch('/messages',{
        method: "POST",
        body: JSON.stringify({
            recipient: recipientEmail,
            subject: subject,
            content: content
        }),
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }

      })
      
      
        .then( res => res.json() )
            .then( res => {
                console.log(res)
                if (!res.subject){

                    messageOne.textContent =res.error   
                }
                else{
                    
                    messageOne.textContent = 'Message sent successfully!'

                    // recipientEmailInput.value=''
                    // subjectInput.value=''
                    // contentInput.value=''
                    window.location.href = '/messageList'
                }

            })

})



window.onload = populateFriendList()