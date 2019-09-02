const dotenv = require("dotenv");
const contentful = require("contentful");

dotenv.config();

var client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

exports.handler = (event, _, callback) => {
  const productId = event.queryStringParameters.id;

  client
    .getEntries(
      Object.assign(
        {
          content_type: "product"
        },
        { "fields.slug": productId }
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
          url: `${process.env.URL}/.netlify/functions/getProduct?id=${productId}`
        };

        return product;
      });

      callback(null, {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(products)
      });
    });
};
