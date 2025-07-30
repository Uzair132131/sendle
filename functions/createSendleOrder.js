import axios from 'axios';

export async function handler(event, context) {
  // Handle preflight CORS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: 'OK',
    };
  }

  try {
    console.log('Received body:', event.body);

    if (!event.body) {
      throw new Error('Missing request body');
    }

    const body = JSON.parse(event.body);

    const authString = Buffer.from(
      `${process.env.SENDLE_ID}:${process.env.SENDLE_API_KEY}`
    ).toString('base64');

    const response = await axios.post(
      process.env.SENDLE_API_URL || 'https://sandbox.sendle.com/api/orders',
      body,
      {
        headers: {
          Authorization: `Basic ${authString}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Sendle API error:', error.response?.data || error.message);

    return {
      statusCode: error.response?.status || 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Sendle order failed',
        details: error.response?.data || error.message,
      }),
    };
  }
}
