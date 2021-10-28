const sendImageForm = document.querySelector('form')

const formName = document.querySelector('#name')
const formDescription = document.querySelector('#desc')
const formImage = document.querySelector('#image')
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
                //emailDropDown.innerHTML=''
                emailArray.forEach( (element)=>{
                var newOption = document.createElement("option");
                newOption.value = element
                newOption.text = element
                emailDropDown.appendChild(newOption);
                })

            })

        })


}







sendImageForm.addEventListener('submit', (e) => {
    e.preventDefault()


    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token

    const file = formImage.files[0]


    const formData = new FormData()
    formData.append('name', formName.value)
    formData.append('desc', formDescription.value)
    formData.append('recipient', emailDropDown.value)
    formData.append('image', file)
  
    fetch('/sendImage', {
        method: 'POST',
        body: formData,
        headers: {  
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('sendImage')
      })
      .catch(error => {
        console.log(error)
      })




})




window.onload = populateFriendList()