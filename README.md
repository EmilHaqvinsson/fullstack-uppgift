# fullstack-uppgift

## Installationsinstruktioner

Den här applikationen består av tre olika "komponenter". 

1. En dockercontainer som kör MongoDB.
2. En backend, som kör Express.js och är skriven i typescript.
3. En frontend, som är byggd med hjälp av react. Också den är skriven i typescript. 


För att starta upp en dockercontainer med den senast tillgängliga MongoDB-avbilden, kör du kommandot `docker run --name mongodb -d -p 27017:27017 mongo` i ditt favorit-shell. Eftersom du vill kunna ansluta till din databas ifrån en annan lokal applikation, så måste du säga till docker att exponera en port. Det görs med tillägget `-p 27017:27017` som alltså öppnar port 27017 på containern.

Du kan testa att ansluta till din databas med till exempel "MongoDB Compass", eller något annat GUI till MongoDB.

Sedan är det dags att installera front- och backend.

Navigera dig fram tills du står i roten på projektet. Kör sedan kommandot `cd client`, följt av `npm start`. Detta startar upp klienten i utvecklingsläge. Låt det fönstret stå kvar öppet, och öppna ett till fönster i projektets rot. Den här gången kör du `cd server`, följt av `npm start`. 

Om allt vill sig väl så ska du nu ha startat upp både databas, backend och frontend, och applikationen är därmed klar att använda.

Happy smurfing!