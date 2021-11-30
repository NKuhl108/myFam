const clientForm = document.querySelector('form')
const deleteForm = document.querySelector('#deleteForm')
const undeleteForm = document.querySelector('#undeleteForm')
const email = document.querySelector('#emailinput')
const password = document.querySelector('#passwordinput')
const messageArea = document.querySelector('#messageArea')
const messageTwo = document.querySelector('#message-2')
const imagePlaceholder = document.querySelector('#imagePlaceholder')
const imageName = document.querySelector('#imageName')
const imageDescription = document.querySelector('#imageDescription')

let currentImageId=0

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
function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  }
function loadImage(imageId) {  
    currentImageId=imageId
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token

    fetch('/image/'+imageId,{
        method: "GET",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
        .then( res => res.json() )
            .then( res => {
                const finalsrc = "data:"+res.contentType+";base64,"+res.data
                imagePlaceholder.src = finalsrc  
                imageName.textContent =res.name
                imageDescription.textContent = res.desc
                
            })
}




deleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
 
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token

    fetch('/image/'+currentImageId,{
        method: "DELETE",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
      .then( res => {
            window.location.href = '/adminImageList'
      })
})

undeleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
 
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token

    fetch('/image/'+currentImageId,{
        method: "PATCH",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
      .then( res => {
            window.location.href = '/adminImageList'
      })
})