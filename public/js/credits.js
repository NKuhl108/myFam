
const clientForm = document.querySelector('#refreshForm')
const addForm = document.querySelector('#addForm')
const removeForm = document.querySelector('#removeForm')
const creditArea = document.querySelector('#creditarea')
const loggedinArea = document.querySelector('#loggedinArea')

// This file manages the front end of the credit page.



function clearCredits() { 
    creditArea.innerHTML=''

}


// This gets executed when the page gets loaded.
// go to backend, get the object that contains the user's credits and then display on page.
function refreshCredits() { 
    //as always, get token so we can authenticate:
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token
    loggedinArea.textContent ='Logged in as: ' + localstorage_user.user.name
    //then go to the backend and as for the credit object for that user
    fetch('/users/credits',{
        method: "GET",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
        .then( res => res.json() )
            .then( res => {
                creditArea.innerHTML='Currently available credits: '+res.credits //this updates the credits on the page
            })
}

clientForm.addEventListener( "submit", ( e ) => {
    e.preventDefault();
    clearCredits()
    refreshCredits()

})
    
//when page loads:
window.onload = refreshCredits()
