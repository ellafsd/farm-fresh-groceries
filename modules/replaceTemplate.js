// Accepts the card.html template and product data as parameters. Takes the values from data.json, inserts them into the {%...%} placeholders,and returns the final HTML.
  const replaceTemplate = (html, data) => {
    // Replace the placeholders, everywhere they appear (/g = global)
    //* *output is the whole HTML string for one card (or one product page). Strings are immutable in JS. replace(...) does not modify the original string(output); it returns a new string. Code assigns that new string back to output each time, so output becomes “more filled in” step by step. */
    let output = html.replace(/{%PRODUCTNAME%}/g, data.productName);
    output = output.replace(/{%QUANTITY%}/g, data.quantity);
    output = output.replace(/{%PRICE%}/g, data.price);
    output = output.replace(/{%IMAGE%}/g, data.image);
    output = output.replace(/{%ID%}/g, data.id);
    output = output.replace(/{%NUTRIENTS%}/g, data.nutrients);
    output = output.replace(/{%DESCRIPTION%}/g, data.description);
    output = output.replace(/{%FROM%}/g, data.from);

   // If the item is NOT organic, inject the 'not-organic' class so the badge hides. If it's organic, inject an empty string so the badge shows. And return the finished HTML string

    if(!data.organic){
        output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    }else{
        output = output.replace(/{%NOT_ORGANIC%}/g, "");
    }
    return output;
}

module.exports = replaceTemplate;