# chat room built with socket.io
Final project for my Computer Networks class. A web app built using Node.js and socket.io. Users enter their username when they enter the room and can then start sending messages to other connected users. Pretty straightforward.

## running it
I haven't deployed the application online, so right now it only runs locally. To run it, clone the repository and run

`node app.js`

The console should read "listening on port 3000." Then, navigate to localhost:3000 and connect. You can connect from as many clients as you want. You only need to run the server once.

## project flow
1. when a client opens the main page, that means a socket has connected to the server so `io​.on​(​'connect'​, ​...)` will be executed
2. when the user clicks the 'enter' button (after entering a username), his socket emits 'join​' to the server
3. on 'join​' on the server side, the server checks the username:
	* if the username is taken, it emits 'exists​' back to the socket which allows the user to keep inputting a username
	* if the username is not taken, it emits 'join​' to all sockets
4. on 'join​' on the client side, the HTML of the page changes using DOM manipulation to create the chat page in the place of the landing page and appends a message to the chat board saying the user has joined
5. the new layout now contains an input bar for messages and a ‘send' button -- when the user clicks the 'send' button, his socket emits 'message​' to the server
6. on 'message​' on the server side, the server receives the client's message, appends the user's username and the time, and it emits 'message​' to all clients
7. on 'message​' on the client side, each client manipulates the HTML of the page to append the new message to it (along with the username and type)
8. if the user disconnects from the chat room (i.e. closes the window), that triggers the socket​ . ​ on​ ( ​ 'disconnect'​ , ​ ​... )​ function on the server side.
9. on 'disconnect​' on the server side, the server deletes the user's username from the users​ object (so the user or someone else can use the same username at a later time in the same session and so that the correct number of online users is displayed) and then emits a 'disconnect​' to all clients
10. on 'disconnect​' on the client side, a message indicating the time and the username of the client who disconnected is appended to the chat room and the ‘Online Users' table is updated