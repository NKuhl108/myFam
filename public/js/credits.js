
const clientForm = document.querySelector('#refreshForm')
const addForm = document.querySelector('#addForm')
const removeForm = document.querySelector('#removeForm')
const creditArea = document.querySelector('#creditarea')



function clearCredits() { 
    creditArea.innerHTML=''

}
function refreshCredits() { 
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.token
    fetch('/users/credits',{
        method: "GET",
        headers: {  
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryToken
        }
      })
        .then( res => res.json() )
            .then( res => {



                creditArea.innerHTML='Credits: '+res.credits


            })
}

clientForm.addEventListener( "submit", ( e ) => {
    e.preventDefault();
    clearCredits()
    refreshCredits()

})
    
window.onload = refreshCredits()
