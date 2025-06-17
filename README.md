# MyWebpage

cd server
npm init 
 npm install express@4 @apollo/server graphql cors body-parser
npm install --save nodemon
"scripts": {
    "start": "nodemon index.js", 
}

 "main": "index.js", // both main and start need same file
  "type": "module",   // set type module under main in package.json to avoid import error 
  
 npm start



npx create-react-app client
cd client
npm start
npm install graphql @apollo/client
