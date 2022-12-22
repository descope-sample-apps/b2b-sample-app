## B2B Sample app
B2B Sample app using Descope for authentication. this app includes
- NodeJS server (run as serverless on vercel)
- React App client

## Getting Started
This Sample app is contain **NodeJS server** and **React App client**. The client will still work fine without a server running. 

After the first-time configuration, you can

###  Run client only
1. Install dependencies - `npm i`
2. create `.env` file with the following content
```env
# Your project id
REACT_APP_DESCOPE_PROJECT_ID=<project-id>
# Optional - Descope base url, e.g. http://localhost:8000
DESCOPE_BASE_URL=http://localhost:8000
```
3. Start the client - `npm run start`

The client is now running on `http://localhost:3000`

### Run the server and client:
You need to setup vercel dev env to run the server as server is designed to run as a serverless function on vercel. You can choose to convert this to a regular nodejs server easily. 

The instructions to setup vercel CLI are here - https://vercel.com/docs/cli

After you have this setup, just run `vercel dev` on the command prompt to start client and server both. 

The client is now running on `http://localhost:3000` and can access data from the server.
