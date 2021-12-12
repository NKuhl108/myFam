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
    submitForm(e)
})

function submitForm(e) {
    e.preventDefault();
    const localstorage_user = JSON.parse(localStorage.getItem('user'))


    const name = document.getElementById("name");
    const files = document.getElementById("files");
    const formData = new FormData();
    formData.append("recipient", emailDropDown.value);
    formData.append("subject", subjectInput.value);
    formData.append("content", contentInput.value);


    formData.append("owner", localstorage_user.user._id);
    formData.append("files", "");
    for(let i =0; i < files.files.length; i++) {
            formData.append("files", files.files[i]);
    }
    
    if (files.files.length==0){
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
                    if (!res.error){
                        messageOne.textContent = 'Message sent successfully!'
    
                        
                        subjectInput.value=''
                        contentInput.value=''
    
                    }
                    else{
                        messageOne.textContent =res.error
    
                    }
    
                })
    }
    else{
        fetch("/upload_files", {
            method: 'post',
            body: formData
        })
            .then((res) => console.log('upload_files'))
            .catch((err) => ("Error occured", err));
    }



}

window.onload = populateFriendList()