const sendImageForm = document.querySelector('form')

const formName = document.querySelector('#name')
const formDescription = document.querySelector('#desc')
const formImage = document.querySelector('#image')
const emailDropDown = document.querySelector('#friendEmails')
const greetingTable = document.querySelector('#greetingTable')


const greetingCell = document.querySelector('#greetingCell')


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
            console.log(res)
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

function addGreetingCard(image){
  
  const finalsrc = "data:"+image.contentType+";base64,"+image.data

  var newImageString = '<img  src="'+finalsrc+'" width=100%>'

  var rowCount = greetingTable.rows.length;
  var row = greetingTable.insertRow(rowCount);
  var radioString = ''
  if (rowCount == 0){
    radioString='checked="checked"'
  }


  row.insertCell(0).innerHTML= '<input type="radio" name="selectedCard" value="'+image._id+'" '+radioString+'>';
  row.insertCell(1).innerHTML= newImageString;



}

function populateImageList() { 


  const localstorage_user = JSON.parse(localStorage.getItem('user'))
  const inMemoryToken = localstorage_user.token
  fetch('/greetingCards',{
    method: "GET",
    headers: {  
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + inMemoryToken
    }
  })
    .then( res => res.json() )
    .then( res => {
        console.log(res)
        res.forEach(element => {
          
          addGreetingCard(element)
            })

          var tbl = greetingTable
          var td = tbl.rows[0].cells[0];
          td.width = '210px';

        })

}





sendImageForm.addEventListener('submit', (e) => {
    e.preventDefault()


    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token

    //const file = formImage.files[0]


    const formData = new FormData()
    formData.append('name', formName.value)
    formData.append('desc', formDescription.value)
    formData.append('recipient', emailDropDown.value)
    
    var cardId = document.querySelector('input[name="selectedCard"]:checked').value;

    formData.append('cardId', cardId)

   

    fetch('/sendGreetingCard',{
      method: "POST",
      body: JSON.stringify({
          name: formName.value,
          desc: formDescription.value,
          recipient: emailDropDown.value,
          cardId: cardId
      }),
      headers: {  
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + inMemoryToken
      }

    })
    
    
      .then( res => res.json() )
          .then( res => {
            //   if (!res.user){
            //       messageOne.textContent ="Error registering user"
            //   }
            //   else{
            //       let inMemoryToken = res.token;
            //       messageOne.textContent ='User ' + ' successfully registered!'
            //       localStorage.setItem('user', JSON.stringify(res));
            //       email.value=''
            //       password.value=''
            //       usernameInput.value=''
            //  }

          })








    // fetch('/sendGreetingCard', {
    //     method: 'POST',
    //     body: formData,
    //     headers: {  
    //         'Authorization': 'Bearer ' + inMemoryToken
    //     }
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('sendImage')
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })




})

function init() { 
  populateFriendList()
  populateImageList()
}


window.onload = init()