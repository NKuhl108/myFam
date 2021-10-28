
const clientForm = document.querySelector('form')
const email = document.querySelector('#emailinput')
const password = document.querySelector('#passwordinput')
const messageArea = document.querySelector('#messageArea')
const messageTwo = document.querySelector('#message-2')

function addImageLink(image) { 
    var table = document.getElementById("myDynamicTable");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML= '<a href=/displayImage/'+image._id+'>'+image.name+'</a>';
    row.insertCell(1).innerHTML= 'by ' + image.authorName;
   
}

function addEmptyText() { 
    var table = document.getElementById("myDynamicTable");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    row.insertCell(0).innerHTML= 'There are no pictures here';
   
}
function clearTable() { 
    var table = document.getElementById("myDynamicTable");
    while(table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML= 'Subject';
    row.insertCell(1).innerHTML= 'Sender';

}
function refreshImages() { 
        const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token
    fetch('/images',{
        method: "GET",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
        .then( res => res.json() )
            .then( res => {

                messageArea.textContent =''
                clearTable()
                res.forEach(element => {
                    addImageLink(element)
                })
                if (res.length == 0){
                    addEmptyText()
                }

            })
}

clientForm.addEventListener( "submit", ( e ) => {
    e.preventDefault();
    clearTable()
    refreshImages()

})
    
window.onload = refreshImages()
