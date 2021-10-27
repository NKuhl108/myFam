
const clientForm = document.querySelector('form')
const email = document.querySelector('#emailinput')
const password = document.querySelector('#passwordinput')
const messageArea = document.querySelector('#messageArea')
const messageTwo = document.querySelector('#message-2')

function addImageLink(image) { 
    var table = document.getElementById("myDynamicTable");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    //row.insertCell(0).innerHTML= image.name;
    row.insertCell(0).innerHTML= '<a href=/displayImage/'+image._id+'>'+image.name+'</a>';
    row.insertCell(1).innerHTML= 'by ' + image.authorName;
   
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
function refreshImages() { 
    console.log( localStorage );
        const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token
    console.log( inMemoryToken );
    fetch('/images',{
        method: "GET",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
        .then( res => res.json() )
            .then( res => {
                console.log('logging res now:')
                console.log( res );

                messageArea.textContent =''
                clearTable()
                res.forEach(element => {
                    console.log('trying to log sende')
                    console.log(element.sendername)


                    console.log('trying to add message link' + element.id)
                    console.log(element)
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
