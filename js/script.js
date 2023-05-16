// Vänta tills hela dokumentet har laddats innan koden körs
document.addEventListener("DOMContentLoaded", function () {

    // Hämta referenser till olika HTML-element från deras ID
    const playerNameInput = document.getElementById("player-name-input"); // Textinmatningsfält för spelarens namn
    const startGameBtn = document.getElementById("start-game-btn"); // Knapp för att starta spelet
    const gameContainer = document.getElementById("game-container"); // Kontainer för själva spelet
    const playerName = document.getElementById("player-name"); // Visning av spelarens namn
    const playerScore = document.getElementById("player-score"); // Visning av spelarens poäng
    const computerScore = document.getElementById("computer-score"); // Visning av datorns poäng
    const rockBtn = document.getElementById("rock-btn"); // Knapp för att välja sten
    const paperBtn = document.getElementById("paper-btn"); // Knapp för att välja papper
    const scissorsBtn = document.getElementById("scissors-btn"); // Knapp för att välja sax
    const result = document.getElementById("result"); // Resultatet av spelet visas här
    const restartGameBtn = document.getElementById("restart-game-btn"); // Knapp för att starta om spelet


    // Deklarera och initiera variabler för spelarens val och poäng
    let playerChoice = ""; // Variabel för spelarens val
    let playerPoints = 0; // Variabel för spelarens poäng
    let computerPoints = 0; // Variabel för datorns poäng

    // Lyssna på klickhändelsen för startknappen
    startGameBtn.addEventListener("click", function () {
        const name = playerNameInput.value; // Hämta värdet från textinmatningsfältet för spelarens namn
        if (name) {
            playerName.textContent = name; // Visa spelarens namn i DOM:en
            gameContainer.style.display = "block"; // Visa spelet genom att ändra display-egenskapen för kontainern
            startGameBtn.disabled = true; // Inaktivera startknappen
        }
    });

    // Funktion för att generera datorns val
    function generateComputerChoice() {
        const choices = ["Sten", "Sax", "Påse"]; // En array med möjliga val för datorn
        const randomIndex = Math.floor(Math.random() * choices.length); // Slumpmässigt index för att välja ett val
        return choices[randomIndex]; // Returnera det slumpade valet
    }

    // Funktion för att uppdatera poängen i DOM:en
    function updateScores() {
        playerScore.textContent = `${playerName.textContent}: ${playerPoints}`; // Visa spelarens poäng
        computerScore.textContent = `Datorn: ${computerPoints}`; // Visa datorns poäng
    }


    // Funktion för att kontrollera vinnaren och avsluta spelet vid behov
    function checkWinner() {
        if (playerPoints === 3 || computerPoints === 3) { // Om någon spelare når 3 poäng
            let winner = "";
            if (playerPoints === 3) { // Om spelaren har 3 poäng
                winner = playerName.textContent; // Spelaren blir vinnaren
            } else { // Annars är det datorn som har 3 poäng
                winner = "Datorn"; // Datorn blir vinnaren
            }
            result.textContent = `${winner} vinner spelet!`; // Visa vinnarens namn i DOM:en
            endGame(); // Avsluta spelet
        }
    }

    // Funktion för att avsluta spelet
    function endGame() {
        rockBtn.disabled = true; // Inaktivera stenknappen
        paperBtn.disabled = true; // Inaktivera pappersknappen
        scissorsBtn.disabled = true; // Inaktivera saxknappen
        restartGameBtn.style.display = "block"; // Visa starta om-knappen genom att ändra display-egenskapen
    }


    // Funktion för att spela en runda
    function playRound(playerChoice) {
        const computerChoice = generateComputerChoice(); // Generera datorns val
        result.textContent = `Ditt val: ${playerChoice} | Datorns val: ${computerChoice}`; // Visa spelarens val och datorns val i DOM:en

        if (playerChoice === computerChoice) { // Om spelarens val och datorns val är lika
            result.textContent += " | Oavgjort!"; // Lägg till en meddelandetext om oavgjort i DOM:en
        } else if (
            (playerChoice === "Sten" && computerChoice === "Sax") || // Spelare väljer sten och datorn väljer sax
            (playerChoice === "Sax" && computerChoice === "Påse") || // Spelare väljer sax och datorn väljer påse
            (playerChoice === "Påse" && computerChoice === "Sten") // Spelare väljer påse och datorn väljer sten
        ) {
            playerPoints++; // Öka spelarens poäng med 1
            result.textContent += " | Du vinner rundan!"; // Lägg till en meddelandetext om att spelaren vinner rundan i DOM:en
        } else {
            computerPoints++; // Öka datorns poäng med 1
            result.textContent += " | Datorn vinner rundan!"; // Lägg till en meddelandetext om att datorn vinner rundan i DOM:en
        }

        updateScores(); // Uppdatera poängen i DOM:en
        checkWinner(); // Kontrollera om det finns en vinnare
    }

    // Lägger till en händelselyssnare för knappen med id "rockBtn"
    rockBtn.addEventListener("click", function () {
        playRound("Sten");
    });

    // Lägger till en händelselyssnare för knappen med id "paperBtn"
    paperBtn.addEventListener("click", function () {
        playRound("Påse");
    });

    // Lägger till en händelselyssnare för knappen med id "scissorsBtn"
    scissorsBtn.addEventListener("click", function () {
        playRound("Sax");
    });

    // Lägger till en händelselyssnare för knappen med id "restartGameBtn"
    restartGameBtn.addEventListener("click", function () {
        // Återställer spelarens val
        playerChoice = "";
        // Återställer spelarens poäng
        playerPoints = 0;
        // Återställer datorns poäng
        computerPoints = 0;
        // Uppdaterar poängen i gränssnittet
        updateScores();
        // Rensar resultatet i gränssnittet
        result.textContent = "";
        // Aktiverar knapparna för sten, påse och sax
        rockBtn.disabled = false;
        paperBtn.disabled = false;
        scissorsBtn.disabled = false;
        // Gömmer omstartsknappen
        restartGameBtn.style.display = "none";
    });
});
