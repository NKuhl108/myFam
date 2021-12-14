// This javascript file build up the navigation menu in the header.
// If no user is logged in, we only see "Register" and "Login"

// If we are an inmate, we don't see the "Send  Picture" Entry (only greeting cards allowed)

// If we are an admin we see the admin menu

// Information is taken from our authentication token (but of course always also checked on backend)
const imageLink = document.querySelector('#sendImageLink')
const localstorage_user = JSON.parse(localStorage.getItem('user'))

let inMemoryToken = ''
if(localstorage_user){
    inMemoryToken = localstorage_user.token
}

var ul = document.getElementById("list");
if (localstorage_user){
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
        var linkText = document.createTextNode("Logout");
        a.appendChild(linkText);
        a.href = "/logout";
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
        var linkText = document.createTextNode("Account/Credits");
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
        var linkText = document.createTextNode("Logout");
        a.appendChild(linkText);
        a.href = "/logout";
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
        var linkText = document.createTextNode("Account/Credits");
        a.appendChild(linkText);
        a.href = "/credits";
        li.appendChild(a);
        ul.appendChild(li);
        
    }
}
else{
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
}