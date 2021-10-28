const refreshForm = document.querySelector('#refreshForm')
const addForm = document.querySelector('#addForm')
const email = document.querySelector('#friendEmailInput')
const password = document.querySelector('#passwordinput')
const messageArea = document.querySelector('#messageArea')
const messageTwo = document.querySelector('#message-2')
const friendNameInput = document.querySelector('#friendNameInput')

function addFriendLine(friendID, friendName, friendEmail) { 
    var table = document.getElementById("myDynamicTable");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML= friendName
    row.insertCell(1).innerHTML= friendEmail


}
function clearTable() { 
    var table = document.getElementById("myDynamicTable");
    while(table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }
}
function refreshFriends() { 
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
                    console.log(element)
                    addFriendLine(element._id,element.name,element.email)
                })

            })
}

function addNewFriend() { 

    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token

    fetch('/users/addfriend',{
        method: "POST",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        },
        body: JSON.stringify({
            email: email.value
        }),

      })
        .then( res => res.json() )
            .then( res => {
                if(res.error){
                    messageArea.textContent =res.error
                }
                else{
                    messageArea.textContent =email.value+' added as friend successfully!'
                    email.value=''
                    clearTable()
                    refreshFriends()

                }
            })
}

refreshForm.addEventListener( "submit", ( e ) => {
    e.preventDefault();
    clearTable()
    refreshFriends()

})


addForm.addEventListener( "submit", ( e ) => {
    e.preventDefault();
    
    addNewFriend() 

})


    
window.onload = refreshFriends()
