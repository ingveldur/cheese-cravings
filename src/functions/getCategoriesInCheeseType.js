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
          include: 3,
          content_type: "cheeseType"
        },
        query
      )
    )
    .then(results => {
      categories = [];
      productsInCateogory = [];

      results.items.forEach(cheeseType => {
        cheeseType.fields.categories.forEach(c => {
          let category = {
            id: c.fields.slug,
            title: c.fields.title,
            products: []
          };
          if (typeof c.fields.products !== "undefined") {
            c.fields.products.forEach(p => {
              category.products.push({
                id: p.fields.slug,
                name: p.fields.name,
                price: p.fields.price,
                currency: p.fields.currency,
                image: p.fields.image.fields.file.url,
                description: p.fields.description.content[0].content[0].value,
                category: c.fields.slug,
                url: `${process.env.URL}/.netlify/functions/getProducts`
              });
            });
          }

          categories.push(category);
        });
      });

      callback(null, {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Max-Age": "2592000",
          "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify(categories)
      });
    });
};
