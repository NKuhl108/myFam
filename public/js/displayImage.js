const clientForm = document.querySelector('form')
const email = document.querySelector('#emailinput')
const password = document.querySelector('#passwordinput')
const messageArea = document.querySelector('#messageArea')
const messageTwo = document.querySelector('#message-2')
const imagePlaceholder = document.querySelector('#imagePlaceholder')
const imageName = document.querySelector('#imageName')
const imageDescription = document.querySelector('#imageDescription')

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
    // needs to be 
    console.log('now setting image')
    const newpath = '/'+image.path.replace('public\\', '')
    console.log(newpath)
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

    console.log('Fetching Image' + imageId) 

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
                //console.log(res)
                const finalsrc = "data:"+res.contentType+";base64,"+res.data
                imagePlaceholder.src = finalsrc  
                console.log(res) 
                imageName.textContent =res.name
                imageDescription.textContent = res.desc
                
            })
}

