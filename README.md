This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run this project, do not forget to clone [Iodine98/convo-backend](https://github.com/Iodine98/convo-backend).

## Available Scripts

At the root of both projects, please run `npm start` to start both the front-end server and the backend server. 

So far, the app will record your voice, upload it to a local server (convo-backend) and save it in a folder called `audio`. If Google Cloud credentials have been set up and the global variable has been set: `GOOGLE_APPLICATION_CREDENTIALS={key_file}.json`, then it will also send a request to the Google speech-to-text API. 

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
