const axios = require("axios");
require("dotenv").config();

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const body = JSON.parse(event.body);

  try {
    const response = await axios.post(process.env.SENDLE_API_URL, body, {
      auth: {
        username: process.env.SENDLE_ID,
        password: process.env.SENDLE_API_KEY
      },
      headers: {
        "Content-Type": "application/json"
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.response?.data || error.message })
    };
  }
};