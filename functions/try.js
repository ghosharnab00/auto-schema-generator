exports.handler = async (event, context) => {
    const name = event.queryStringParameters.url || "World";
    console.log(event.body);
    return {
      statusCode: 200,
      body: `Hello, ${name}`,
    };
  };