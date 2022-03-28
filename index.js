require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const router = require("./app/router");
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

const PORT = process.env.PORT || 5000;
//Swager Config
const expressSwagger = require("express-swagger-generator")(app);

let options = {
    swaggerDefinition: {
        info: {
            description: "AwkwardTowersAPI",
            title: "API",
            version: "1.0.0",
        },
        host: `localhost:${PORT}`,
        basePath: "/",
        produces: ["application/json"],
        schemes: ["http", "https"],
    },
    basedir: __dirname, //app absolute path
    files: ["./app/**/*.js"], //Path to the API handle folder
};
expressSwagger(options);
// Ensuite dans le navigateur pour y acceder via l'url : http://localhost:3000/api-docs

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});