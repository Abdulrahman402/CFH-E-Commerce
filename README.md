# CFH E-Commerce

This is a Node.js/Express e-commerce application using TypeScript, Mongoose, and JWT for authentication.

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)
- MongoDB (>= 4.x)

## Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/CFH-E-Commerce.git
   cd CFH-E-Commerce

   ```

2. Install dependencies:

   npm install

3. Create a .env file in the root directory and add the following variables:

   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/CFH
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret

4. Start the MongoDB server:

   mongod

## Running the Application

    npm run dev

## Testing

    npm run test
