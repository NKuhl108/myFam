// This little javascript file shows the link to send picture messages ONLY to non-inmates
// (of course in addition we need to check on the backend)

const imageLink = document.querySelector('#sendImageLink')

const localstorage_user = JSON.parse(localStorage.getItem('user'))
const inMemoryToken = localstorage_user.token
console.log(localstorage_user.user.inmate)

var ul = document.getElementById("list");


if (localstorage_user.user.isAdmin == false){

    var li = document.createElement("li");
    var a = document.createElement('a');
    var linkText = document.createTextNode("Register");
    a.appendChild(linkText);
    a.href = "/register";
    li.appendChild(a);
    ul.appendChild(li);


    var li = document.createElement("li");
    var a = document.createElement('a');
    var linkText = document.createTextNode("Login");
    a.appendChild(linkText);
    a.href = "/login";
    li.appendChild(a);
    ul.appendChild(li);

    var li = document.createElement("li");
    var a = document.createElement('a');
    var linkText = document.createTextNode("Friends");
    a.appendChild(linkText);
    a.href = "/friends";
    li.appendChild(a);
    ul.appendChild(li);

    var li = document.createElement("li");
    var a = document.createElement('a');
    var linkText = document.createTextNode("Messages");
    a.appendChild(linkText);
    a.href = "/messageList";
    li.appendChild(a);
    ul.appendChild(li);

    var li = document.createElement("li");
    var a = document.createElement('a');
    var linkText = document.createTextNode("New Message");
    a.appendChild(linkText);
    a.href = "/newMessage";
    li.appendChild(a);
    ul.appendChild(li);

    var li = document.createElement("li");
    var a = document.createElement('a');
    var linkText = document.createTextNode("Pictures");
    a.appendChild(linkText);
    a.href = "/imageList";
    li.appendChild(a);
    ul.appendChild(li);



    if (localstorage_user.user.inmate == false){
        var li = document.createElement("li");
        var a = document.createElement('a');
        var linkText = document.createTextNode("Send Picture");
        a.appendChild(linkText);
        a.href = "/sendImage";
        li.appendChild(a);
        ul.appendChild(li);
    }


    var li = document.createElement("li");
    var a = document.createElement('a');
    var linkText = document.createTextNode("Send Card");
    a.appendChild(linkText);
    a.href = "/sendGreetingCard";
    li.appendChild(a);
    ul.appendChild(li);

    var li = document.createElement("li");
    var a = document.createElement('a');
    var linkText = document.createTextNode("Credits");
    a.appendChild(linkText);
    a.href = "/credits";
    li.appendChild(a);
    ul.appendChild(li);

}

if (localstorage_user.user.isAdmin == true){


    var li = document.createElement("li");
    var a = document.createElement('a');
    var linkText = document.createTextNode("Login");
    a.appendChild(linkText);
    a.href = "/login";
    li.appendChild(a);
    ul.appendChild(li);

    
    var li = document.createElement("li");
    var a = document.createElement('a');
    var linkText = document.createTextNode("All Messages");
    a.appendChild(linkText);
    a.href = "/adminMessageList"; //list of all messages from all users
    li.appendChild(a);
    ul.appendChild(li);

    
    var li = document.createElement("li");
    var a = document.createElement('a');
    var linkText = document.createTextNode("All Picture Messages");
    a.appendChild(linkText);
    a.href = "/adminImageList"; //list of all messages from all users
    li.appendChild(a);
    ul.appendChild(li);

    

    var li = document.createElement("li");
    var a = document.createElement('a');
    var linkText = document.createTextNode("Credits");
    a.appendChild(linkText);
    a.href = "/credits";
    li.appendChild(a);
    ul.appendChild(li);
    
}
