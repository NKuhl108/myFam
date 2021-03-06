const deleteForm = document.querySelector('#deleteForm')
const undeleteForm = document.querySelector('#undeleteForm')
const imagearea = document.querySelector('#image')
const imageArea = document.querySelector('#imagePlaceholder')


// This is the front end part of displaying a message to administrators


let currentMessageId=0

function addSubject(newData) { 
    var table = document.getElementById("myDynamicTable");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML= 'Subject';
    row.insertCell(1).innerHTML= newData;
}
function addContent(newData) { 
    var table = document.getElementById("myDynamicTable");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML= 'Content';
    row.insertCell(1).innerHTML= newData;
}

function setimage(image) { 
    const newpath = '/'+image.path.replace('public\\', '')
    imageArea.src=newpath
}

function clearTable() { 
    var table = document.getElementById("myDynamicTable");
    while(table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }
}

function loadMessage(messageId) { 
    currentMessageId=messageId   
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token

    fetch('/messages/'+messageId,{
        method: "GET",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
        .then( res => res.json() )
            .then( res => {
                addSubject(res.subject)
                addContent(res.content)  
                if (res.image){
                    setimage(res.image) 
                }
            })
}




deleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
 
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token

    fetch('/messages/'+currentMessageId,{
        method: "DELETE",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
      .then( res => {
            window.location.href = '/adminMessageList'
      })
})

undeleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
 
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token

    fetch('/messages/'+currentMessageId,{
        method: "PATCH",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
      .then( res => {
            window.location.href = '/adminMessageList'
      })
})









