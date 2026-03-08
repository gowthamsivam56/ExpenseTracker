# MyWebpage

## Set up backend with Apollo Server, GraphQL, and TypeScript

```sh
cd server
npm init -y
npm install express@4 @apollo/server graphql cors body-parser
npm install --save-dev typescript ts-node nodemon @types/node @types/cors
npx tsc --init
npm install --save-dev copyfiles
```

Create source folder and entry file:

```sh
mkdir src
touch src/main.ts
```

Update `package.json`:

```json
"main": "dist/main.js",
"scripts": {
  "build": "tsc && npm run copy-files",
  "copy-files": "copyfiles -u 1 src/**/*.gql dist/",
  "start": "node dist/main.js",
  "dev": "nodemon --watch src --exec ts-node src/main.ts",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```
Update `tsconfig.json`;

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "moduleResolution": "node",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

Run in dev mode:

```sh
npm run dev
```

For normal start:

```sh
npm install && npm run build
npm start
```

Install MongoDB:

```sh
npm install mongodb
```

Install dotenv to manage environment variables:

```sh
npm install dotenv
```
```sh
npm install bcrypt
npm install -D @types/bcrypt
npm install graphql-tag
npm install googleapis
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken
```

Update `.gitignore`;

```
# Node modules
node_modules/

# Environment variables
.env
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
npm install react-intl --legacy-peer-deps
```

---
