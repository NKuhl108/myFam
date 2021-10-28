
const clientForm = document.querySelector('form')
const email = document.querySelector('#emailinput')
const password = document.querySelector('#passwordinput')
const messageArea = document.querySelector('#messageArea')
const messageTwo = document.querySelector('#message-2')

function addMessageLink(messageId, messageSubject, messageSender) { 
    var table = document.getElementById("myDynamicTable");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML= '<a href=/showMessage/'+messageId+'>'+messageSubject+'</a>';
    row.insertCell(1).innerHTML= 'by ' + messageSender;
   
}

function addEmptyText() { 
    var table = document.getElementById("myDynamicTable");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    row.insertCell(0).innerHTML= 'There are no messages here';
   
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
function refreshMessages() { 
        const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token
    fetch('/messages',{
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
                    addMessageLink(element._id,element.subject,element.authorName)
                })
                if (res.length == 0){
                    addEmptyText()
                }

            })
}

clientForm.addEventListener( "submit", ( e ) => {
    e.preventDefault();
    clearTable()
    refreshMessages()

})
    
window.onload = refreshMessages()
