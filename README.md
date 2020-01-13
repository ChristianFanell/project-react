This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


# Redovisning

Detta är en redovisningstext för kursen jsramverk, Blekinge tekniska högskola. 

Jag valde React igen som ramverk och körde samma login-funktionalitet som i de tidigare kursmomenten, dvs. med session storage. Det hade kanske varit intressant att köra på Vue och en mer säker autensiering (med cookies istället), men i och med att jag lämnar in det här projektet senare ville jag speeda på processen. Appen är en plattform för att köpa och sälja guld, silver och koppar. Detta kan man enbart göra som inloggad. 

För att hämta in data från mitt API använder jag mig av den inbyggda funktionen fetch() som jag tycker är smidig och enkelt. För att skriva ut diagrammet använder jag chart.js där det fanns många exempel på nätet varpå implementeringen gick ganska fort och med egna justeringar såklart. I diagramkomponenten kommunicerar socket.io-client med min socket-server som uppdateras var femte sekund. Priserna pushar jag in i arrayer och där varje element är en tidpunkt i diagrammet. Jag har begränsat arrayernas längd till 25 för att få det läsbart. Klickar man på t ex "Köp guld" eller "Sälj" hänger priserna med in i köp/säljkomponenten där de fryser. Sedan är det bara att köpa guld, silver eller koppar efter sina resurser. Socket.io-client använde jag till chatten och jag såg ingen anledning till att kolla upp något nytt.

Det går att se tidigare köp och försäljningar (också till enhetspris) på en egen sida och jag har också summerat den totala skillnaden mellan köp och sälj. Jag har använt mig av Bootstrap i det här projektet. Det förenklade mycket vad gäller t ex tabeller, responsitivitet och knappar.

Nästa gång jag gör en React-app kommer jag att använda mig av hooks istället. Redux hade varit trevligt för att kunna sätta state för t ex användarnamn och inloggning. 