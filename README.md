# 4413-Project - Sunsational Shades

Welcome to EECS4413 - SunSational Shades Project!

The project is publicly hosted at https://sunsationalshades.shop

![Screenshot 2023-04-09 at 11 24 49 AM](https://user-images.githubusercontent.com/43624414/230785897-c2ec4b8c-2238-4114-be2d-edda60cf6299.png)

# Setting up the application locally

NOTE: Skip this section if you are accessing the website online.

Node.js is required in order to run this project, and instructions on how it can be downloaded are at the following link: https://nodejs.org/en/ . Node version can be checked by running `node -v` if already installed.

To download the project locally, run git clone https://github.com/petroste/4481Project.git in your testing directory, assuming git is installed on the user’s machine. Alternatively, download and unpack the ZIP file from the github repository.

After the files are installed, the user should be able to see 2 directories (frontend and backend) in the 4413-Project folder, which is the parent folder for the project.

The frontend folder is responsible for front-end related tasks. It is important to install necessary packages to run the application. First, navigate to the 4413-Project/frontend directory in a terminal, and issue the command `npm install` to install all of the required packages and dependencies for the front-end of the application.

Similarly, after this process is complete, do the same for the server side, by navigating to 4413-Project/backend directory and issuing `npm install`. Again, this will automatically install all required packages needed to run the back-end of the application.

After the setup is complete, the user is now ready to start the app. First, navigate to the `4413-Project/backend` directory in a terminal, and run the command `node server.js`. This should start the node.js server on the application side and connect to the database.

The server is now hosted on port 4000 on the local machine. In another terminal, navigate to the `4413-Project/frontend` directory, and run `npm start`. This will start the React app on `http://localhost:3000/`. Now, by navigating to this link, we will see the home screen of the application, and the user can now use the application.

The customer can now use the application, as explained in the demo

A customer (an unauthorized user in the project's case), can simply navigate to the home button and type in their name to start a chat with an available agent, and does not need to sign in to use the app.

