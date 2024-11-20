// DOM Elementlerini Seç
const choices = document.querySelectorAll(".choice");
const gameResult = document.getElementById("game-result");
const playerChoiceDisplay = document.getElementById("player-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");

// Olası Seçimler
const possibleChoices = ["taş", "kağıt", "makas"];

// Skorlar
let playerScore = 0;
let computerScore = 0;

// Oyun Mantığı
function playGame(playerChoice) {
    // Bilgisayarın Rastgele Seçimi
    const computerChoice = possibleChoices[Math.floor(Math.random() * possibleChoices.length)];

    // Sonuç Hesaplama
    let result;
    if (playerChoice === computerChoice) {
        result = "Berabere!";
    } else if (
        (playerChoice === "taş" && computerChoice === "makas") ||
        (playerChoice === "kağıt" && computerChoice === "taş") ||
        (playerChoice === "makas" && computerChoice === "kağıt")
    ) {
        result = "Kazandın!";
        playerScore++; // Kullanıcı skoru artır
    } else {
        result = "Kaybettin!";
        computerScore++; // Bilgisayar skoru artır
    }

    // Sonuçları Göster
    playerChoiceDisplay.textContent = playerChoice;
    computerChoiceDisplay.textContent = computerChoice;
    gameResult.textContent = `Sonuç: ${result}`;

    // Skorları Güncelle
    updateScores();
}

// Skor Güncelleme Fonksiyonu
function updateScores() {
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
}

// Kullanıcı Seçimlerine Olay Dinleyicileri Ekle
choices.forEach(choice => {
    choice.addEventListener("click", () => {
        const playerChoice = choice.getAttribute("data-choice");
        playGame(playerChoice);
    });
});
