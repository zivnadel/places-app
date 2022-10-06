# Places App
A demo web app to share and view locations you and your friends added, made with the MERN Stack.

## Preview
![image](https://user-images.githubusercontent.com/52624380/194352655-392530e4-0e6a-4107-9392-d1a1d786f4dc.png)
[Website URL](https://places-explorer-demo.netlify.app/)

## Usage
### TypeScript
Both backend and frontend are made using TypeScript, create-react-app is preconfigured to work with TypeScript the same way it works with regular JavaScript, but the backend uses a 3rd party library to run and update the server.

### Install Dependencies
```
cd frontend
npm install
cd ../backend
npm install
```

### Run
In order to run the application, both the backend and the frontend have to be executed.
The frontend in running on port 3000 (localhost:3000) and the backend is running on port 5000 (localhost:5000)
```
cd frontend
npm start
cd ../backend
npm start
```

### Environmental Variables
Both the frontend and the backend are using environmental variables. Those variables needs to be configured by you in a .env file inside the roots of the frontend and the backend folders.
#### Frontend Environmental Variables
```
REACT_APP_GOOGLE_MAPS_API_KEY - A google maps API key that can be obntained from the Google Cloud Console.
REACT_APP_BACKEND_URL - The backend url (localhost:5000)
```
#### Backend Environmental Variables
```
MONGODB_URI - A connection string to a mongodb instance.
GOOGLE_API_KEY - A google maps API key that can be obntained from the Google Cloud Console.
JWT_KEY - a secret string that is used to sign the JSON Web Token.
```
## Features
- View of all the registered users inside a clickable cards.
- User page containing all of its places.
- Full featured interface to edit, view and delete places.
- "View On Map" button on every place display which shows the actual location of the place in a map.
- Secured authentication and authorization system.
- Image upload (for users and places).

## Technologies Used
### Frontend
TypeScript, React.js, react-router-dom (v6), react-transition-group, create-react-app, axios, TailwindCSS, Google Maps API, Netlify for deployment.
### Backend
TypeScript, Node.js, Express.js, MongoDB, mongoose, multer, axios, JWT, express-validator, mongoose-unique-validator, ts-node-dev, Google Geocode API, Render for deployment.

@zivnadel

⚡️
