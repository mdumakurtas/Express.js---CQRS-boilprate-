# Coffee mug - test exercise

## Setup project

1. Clone the repository
2. Install nvm (node version manager) 
3. Run `nvm install` to install the correct node version
4. Install dependencies with `npm install` (it will create `.env` file if it doesn't exist)
5. Install docker and docker-compose
6. Run `docker-compose up -d` to start the MongoDB database

## Build project

```shell
npm run build
```

## Run project

```shell
npm run start
```

After running the project, you can access the API at `http://localhost:3000`

## Postman collection

You can import the postman collection from the file [coffemug.postman_collection.json](docs/coffemug.postman_collection.json) to test the API
