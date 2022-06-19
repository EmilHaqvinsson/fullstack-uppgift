# Dokumentation, Emil Haqvinsson

##### Beskriv lite olika lösningar du gjort

Jag valde att skicka med användarens id och användarnamn redan i login-fasen, snarare än att söka i databasen efter användarnamn med hjälp av Idt flera gånger (exempelvis en gång i navbar, och en till gång på profilsidan).

##### Beskriv något som var besvärligt att få till

Jag hade en del problem med inloggningsfunktionen. Ett tag gick det att logga in med vilket lösenord som helst (eller inget lösenord alls), och när jag lyckades lösa det problemet så lyckades jag förstöra en annan del av koden så att man plötsligt inte behövde skriva i###n något användarnamn alls för att bli inloggad. Med hjälp av (oerhört) många console.log() och en hel del envetenhet lyckades jag dock få till det till slut!

##### Beskriv om du fått byta lösning och varför i sådana fall

Jag försökte från början skriva en login funktion "själv" från grunden, men det blev lite väl rörigt att hålla reda på alla detaljerna. Då det sättet jag försökte göra på dessutom verkade krocka lite med våra tester, så gick jag över till att ta utgångspunkt i koden som Lars har skrivit och med en del förändringar anpassa den till vårt usecase.

##### Beskriv hur du felsökt ditt program när det uppstått problem

Jag är ett stort fan av console.log(). Jag strör omkring dem i koden överallt för att försöka förstå vad som händer och var (och om) det går fel. Om jag vill veta vad `userId` är värd efter genomförd inloggning så lägger jag in en `console.log('User is logged in and has id ' + userId)` i koden. Dessvärre är jag inte lika duktig på att plocka bort dem efter mig när koden fungerar som den ska, vilket ibland medför att det körs så många loggar i konsolen att annan viktig data nästan "drunknar".  Jag brukar också använda mig av breakpoints i dev-tools och sen "steppa" igenom koden rad för rad - igen för att lättare kunna se t.ex. var fel uppstår, vad olika variabler är värda vid olika tidspunkter, eller vilket return-värde en funktion har innan och efter en förändring i koden.

# Utvärdera din inlämning

##### Vad gick bra

När jag väl hade satt mig in i koden ordentligt kände jag att de flesta problem gick lätt att lösa. Det är mycket att sätta sig in i med models och Interfaces och controllers och services men det är mycket belönande när man väl har suttit med det i några timmar.
Vad gick dåligt

##### Vad har du lärt dig

En hel massa, både om typescript men också om både React och Express. Kanske mest belönande ändå var nog all api-kommunikation som görs medans t.ex registrerings-funktionen utvecklas. Den "mängdträningen" jag fick där tror jag att jag kommer att ha mycket stor nytta av i framtiden.

##### Motivera varför du valt en specifik lösning

Jag valde att skicka med användarnamn och ID som svar ifrån backend.  Det gjorde jag dels för att "förenkla" koden genom att göra den mer läsbar, och dels för att jag ville ha så få API-anrop som möjligt, eftersom de blir potentiella "points of failure" då de kräver att två olika delar av applikationen samarbetar. När både Id och användarnamn nu kommer tillbaka ifrån API:et så behöver jag inte sen göra ett extra anrop för att jag vill ha tag i användarens användarnamn.

##### Lämna förslag på förbättringar av din kod

Jag ångrar lite att jag inte la till fler fält i användar-tabellen. Det hade varit roligt att ha mer data om användaren att jobba med senare i projektet, t.ex. i arbetet med användarens profil. Jag grämer mig också lite över att jag inte kom på ideen att inkludera ett fält för URL till en profilbild.

##### Lämna förslag på förbättringar av din UI/UX design eller reflektera över den

Jag var inte så involverad i arbetet med designen på sidan, utan har mest fokuserat på backend-koden. Med det sagt så tycker jag att sidan eventuellt kunde ha varit lite "kantigare" i sitt formspråk, men det är en helt subjektiv iaktagelse. Jag tror t.ex inte att en sådan förändring skulle ha förändrat en användares upplevelse/UX nämnvärt.

##### Övrigt

Tycker att det gick bra att arbeta med min grupp, och jag tror att vi alla hade lite kul under vägen! Jag vet att i alla fall jag hade det.
