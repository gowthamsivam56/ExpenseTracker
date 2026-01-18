# MyWebpage

## Set up backend with Apollo Server, GraphQL, and TypeScript

```sh
cd server
npm init -y
npm install express@4 @apollo/server graphql cors body-parser
npm install --save-dev typescript ts-node nodemon @types/node @types/cors
npx tsc --init
```

Create source folder and entry file:

```sh
mkdir src
touch src/main.ts
```

Update `package.json`:

```json
"main": "src/main.ts",
"scripts": {
  "start": "ts-node src/main.ts",
  "dev": "nodemon --watch src --exec ts-node src/main.ts"
}
```

Run in dev mode:

```sh
npm run dev
```

For normal start:

```sh
npm start
```

Install MongoDB:

```sh
npm install mongodb
```

---

## Create React Frontend

```sh
npx create-react-app client
cd client
npm start
```

Install client dependencies:

```sh
npm install graphql @apollo/client
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @mui/system     # optional
npm install formik
npm install formik-mui
npm install @mui/x-charts
npm install react-router-dom
```

---
