const sendle = require('sendle');
require('dotenv').config();

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // or replace * with your domain
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: 'OK'
    };
  }

  try {
    const body = JSON.parse(event.body);

    const response = await sendle.createOrder({
      sendle_id: process.env.SENDLE_ID,
      api_key: process.env.SENDLE_API_KEY,
      order: {
        ...body // assumes your payload is shaped correctly
      },
      sandbox: process.env.NODE_ENV !== 'production'
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow from frontend
      },
      body: JSON.stringify(response)
    };
  } catch (error) {
    console.error('Sendle API error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Always include CORS headers
      },
      body: JSON.stringify({ error: 'Sendle order failed', details: error.message })
    };
  }
};
