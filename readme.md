for local testing:
start backend
    npm start

in the frontend directory terminal
    npm run dev

open -> http://localhost:5173

-Doing it this way instead of docker ensures we still connect to the remote database linked in .env file. 

-We are using port 5001 instead of 5000. Anywhere in setup we saw 5000, use 5001 instead. Apple airplay or something uses 5000.