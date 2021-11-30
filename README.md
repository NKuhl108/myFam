This application is currently deployed here:
https://kuhl-myfam-application.herokuapp.com/



To run it on your own machine:
- Clone the repository
- Start up a local mongodb server
- Run "npm install" to install the required libraries
- Install nodemon globally if you haven't done so already "npm install nodemon -g"
- Create a file called ".env" in the base directory. This step provides the environment variables the application expects. It has the following content:

PORT=3000

MONGODB_URL=mongodb://127.0.0.1:27017/my-fam-db

  

- To start the application, run "npm run dev"
- Navigate to http://localhost:3000 in your webbrowser
