
const clientForm = document.querySelector('form')

// This file manages the front end part of displaying the message list for administrators

// add an entry for each meassage
function addMessageLink(messageId, messageSubject, messageSender,messageRecipient,deletedStatus) { 
    var table = document.getElementById("myDynamicTable");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML= '<a href=/adminShowMessage/'+messageId+'>'+messageSubject+'</a>';
    row.insertCell(1).innerHTML= 'by ' + messageSender;
    row.insertCell(2).innerHTML= 'to ' + messageRecipient;
    let deletedCode = ''
    if (deletedStatus == true){
        deletedCode='<img width="20px" src="/images/trashcan.jpg"></img>'
    }
    row.insertCell(3).innerHTML= deletedCode;
   
}

function addEmptyText() { 
    var table = document.getElementById("myDynamicTable");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    row.insertCell(0).innerHTML= 'There are no messages here';
   
}
//clears the table
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
    row.insertCell(2).innerHTML= 'Recipient';
    row.insertCell(3).innerHTML= 'Deleted';

}
// this gets called when page gets loaded and does most of the work
function refreshMessages() { 
        const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token
    //go to backend and ask for message list
    fetch('/adminMessages',{
        method: "GET",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
        .then( res => res.json() )
            .then( res => {

                
                clearTable()
                res.forEach(element => {
                    if (element.hasOwnProperty('isDeleted')==false){
                        element.isDeleted=false
                    }
                    addMessageLink(element._id,element.subject,element.authorName,element.recipientName,element.isDeleted)
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
