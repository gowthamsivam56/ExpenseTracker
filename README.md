# MyWebpage
Set up backend with Apollo Server, GraphQL

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



Set up backend with Apollo Server, GraphQL, and TypeScript

cd server
npm init -y
npm install express@4 @apollo/server graphql cors body-parser
npm install --save-dev typescript ts-node nodemon @types/node @types/cors
npx tsc --init

mkdir src
touch src/main.ts

"main": "src/main.ts",
"scripts": {
  "start": "ts-node src/main.ts",
  "dev": "nodemon --watch src --exec ts-node src/main.ts"
}


npm run dev

//npm start
npm install mongodb





npx create-react-app client
cd client
npm start
npm install graphql @apollo/client
