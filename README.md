# Sendle API Netlify Functions

A Netlify serverless function that integrates with the Sendle API for shipping services.

## Overview

This project provides a serverless function that acts as a proxy to the Sendle API, allowing you to create shipping orders through Sendle's services. The function is deployed on Netlify and handles authentication and API communication.

## Features

- POST endpoint for creating Sendle orders
- Secure authentication using environment variables
- Error handling and response formatting
- Netlify serverless function deployment

## Setup

### Prerequisites

- Node.js installed
- Netlify account
- Sendle API credentials

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your Sendle credentials:
   ```
   SENDLE_API_URL=https://api.sendle.com/api/orders
   SENDLE_ID=your_sendle_id
   SENDLE_API_KEY=your_sendle_api_key
   ```

### Deployment

1. Deploy to Netlify:
   ```bash
   netlify deploy
   ```

2. Set environment variables in your Netlify dashboard:
   - `SENDLE_API_URL`
   - `SENDLE_ID`
   - `SENDLE_API_KEY`

## Usage

The function accepts POST requests with a JSON body containing the order details. The request will be forwarded to the Sendle API with proper authentication.

### Example Request

```bash
curl -X POST https://your-netlify-app.netlify.app/.netlify/functions/createSendleOrder \
  -H "Content-Type: application/json" \
  -d '{
    "pickup_date": "2024-01-15",
    "description": "Sample package",
    "kilogram_weight": 1.5,
    "cubic_metre_volume": 0.01,
    "customer_reference": "ORDER123",
    "sender": {
      "contact": {
        "name": "John Doe",
        "phone": "1234567890",
        "email": "john@example.com"
      },
      "address": {
        "address_line1": "123 Main St",
        "suburb": "Sydney",
        "state_name": "NSW",
        "postcode": "2000",
        "country": "Australia"
      }
    },
    "receiver": {
      "contact": {
        "name": "Jane Smith",
        "phone": "0987654321",
        "email": "jane@example.com"
      },
      "address": {
        "address_line1": "456 Oak Ave",
        "suburb": "Melbourne",
        "state_name": "VIC",
        "postcode": "3000",
        "country": "Australia"
      }
    }
  }'
```

## Project Structure

```
├── functions/
│   └── createSendleOrder.js    # Main serverless function
├── netlify.toml               # Netlify configuration
├── package.json              # Node.js dependencies
└── README.md                 # Project documentation
```

## Dependencies

- `axios`: HTTP client for API requests
- `dotenv`: Environment variable management

## License

This project is open source and available under the [MIT License](LICENSE). 