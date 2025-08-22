//Load Node’s core modules
const http = require("http");
const url = require("url");
const fs = require("fs");
const replaceTemplate = require("./modules/replaceTemplate")

let overviewHTML =  fs.readFileSync("./templates/overview.html","utf-8");
let cardTemplate = fs.readFileSync("./templates/card.html","utf-8");
let detailTemplate = fs.readFileSync("./templates/product.html","utf-8");
let jsonData = fs.readFileSync("./dev-data/data.json","utf-8");

const data = JSON.parse(jsonData);

const server = http.createServer((request, response) => {
    const { pathname, query } = url.parse(request.url, true)  

    console.log("\n\nID of the product:", query, "\n\n");

switch (pathname) {
        case "/product":
        const item = data.find((item)=>item.id == query.id);
        const output = replaceTemplate(detailTemplate,item);
        return response.end(output);

        case "/overview":
            // Build one HTML card for each product in data.json
            // Fill the card.html template with this product's values
            // Join all card strings into one big string
            // Put the big string of cards into the overview.html placeholder
            // Send the finished HTML to the browser
            let cards = data.map( (item)=>{ return replaceTemplate(cardTemplate,item)}).join("");   
            page = overviewHTML.replace('{%PRODUCT_CARDS%}',cards);     
            return response.end(page);

        case "/":
            return response.end("<h1>Welcome to Homepage.</h1>");

       default: {
        response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        return response.end("<h1>404</h1><h2>Page not found...</h2>");
       }
    }
})
server.listen(4000, "127.0.0.1", () => {
    console.log("Server is now listening for requests on http://127.0.0.1:4000");
})