var contentful = require("contentful");

var client = contentful.createClient({
  space: "xofor6t276q8",
  accessToken: "Dbw9S4BO-79LLwhMpRx4vvZXFhSAbZA4RfpbvJNLR4o"
});

exports.handler = (event, context, callback) => {
  client
    .getEntries({
      content_type: "product"
    })
    .then(results => {
      const products = results.items.map(p => {
        const product = {
          id: p.fields.slug,
          name: p.fields.name,
          price: p.fields.price,
          currency: p.fields.currency,
          image: p.fields.image.fields.file.url,
          description: p.fields.description.content[0].content[0].value,
          url: `${process.env.URL}/.netlify/functions/getProducts`
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
