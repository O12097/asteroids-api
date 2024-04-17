# RESTful API for Near-Earth Asteroids
This API provides information about asteroids that are approaching Earth. It retrieves data from the NASA API 
and presents it in a user-friendly format that can be easily accessed by client applications.

### Features
- `/asteroids` Endpoint: Get information about asteroids for a specific date.
- GET Method: Retrieves data using the HTTP GET method.
- Error Handling: Handles errors gracefully and provides clear error responses.

### Technologies Used
- Node.js
- Express.js
- Axios

### How to Use
- Clone this repository to your local machine.
- Run the server by executing the command node server.js.
- Access the API via http://localhost:3000/asteroids?date=YYYY-MM-DD, replacing YYYY-MM-DD with the date you want to check for asteroids.

### Contribution
Feel free to create pull requests to improve this API.

### Notes
A valid NASA API key is required to access asteroid data. You can obtain a key by registering on the NASA API https://api.nasa.gov/.
