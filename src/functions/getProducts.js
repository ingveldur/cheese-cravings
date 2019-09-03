const dotenv = require("dotenv");
const contentful = require("contentful");

dotenv.config();

var client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

exports.handler = (event, _, callback) => {
  let query = { "fields.slug": event.queryStringParameters.id };

  client
    .getEntries(
      Object.assign(
        {
          content_type: "product"
        },
        query
      )
    )
    .then(results => {
      const products = results.items.map(p => {
        const product = {
          id: p.fields.slug,
          name: p.fields.name,
          price: p.fields.price,
          currency: p.fields.currency,
          image: p.fields.image.fields.file.url,
          description: p.fields.description.content[0].content[0].value,
          category: "TODO!!",
          url: `${process.env.URL}/.netlify/functions/getProducts`
        };

        return product;
      });

      callback(null, {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Max-Age": "2592000",
          "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify(products)
      });
    });
};
