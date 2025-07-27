# Backend Server

This is a Node.js backend server using Express and connected to MongoDB with Mongoose.

## Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Make sure MongoDB is running locally or update the connection string in `index.js` to your MongoDB URI.

4. Start the server:
   ```
   npm run dev
   ```

The server will run on port 5000 by default.

## API Endpoints

- `GET /api/items` - Get all items
- `POST /api/items` - Create a new item (expects JSON body with `name` and `quantity`)

You can extend this backend with more routes and functionality as needed.
