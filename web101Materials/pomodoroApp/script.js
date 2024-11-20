// DOM Elementlerini Seç
const timerLabel = document.getElementById("timer-label");
const timeLeft = document.getElementById("time-left");
const startStopButton = document.getElementById("start-stop");
const resetButton = document.getElementById("reset");
const workTimeInput = document.getElementById("work-time-input");
const breakTimeInput = document.getElementById("break-time-input");
const applySettingsButton = document.getElementById("apply-settings");
const completedCountElement = document.getElementById("completed-count");

// Pomodoro Süreleri (dakika cinsinden)
let WORK_TIME = 25; // Çalışma süresi
let BREAK_TIME = 5; // Mola süresi

// Uygulama Durumları
let isRunning = false;
let isWorkTime = true;
let remainingTime = WORK_TIME * 60; // Saniye cinsinden
let timerInterval = null;
let completedPomodoros = 0; // Tamamlanan Pomodoro sayısı

// Zamanı Güncelleme İşlevi
function updateTime() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timeLeft.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Tamamlanan Pomodoro sayısını güncelle
function updateCompletedPomodoros() {
    completedPomodoros++;
    completedCountElement.textContent = completedPomodoros;
}

// Zamanlayıcıyı Başlat/Durdur
function toggleTimer() {
    if (isRunning) {
        // Zamanlayıcı durduruluyor
        clearInterval(timerInterval);
        isRunning = false;
        startStopButton.textContent = "Başlat";
    } else {
        // Zamanlayıcı başlatılıyor
        timerInterval = setInterval(() => {
            if (remainingTime > 0) {
                remainingTime--;
                updateTime();
            } else {
                // Süre bittiğinde döngüyü değiştir
                isWorkTime = !isWorkTime;
                remainingTime = (isWorkTime ? WORK_TIME : BREAK_TIME) * 60;
                timerLabel.textContent = isWorkTime ? "Çalışma Süresi" : "Mola Süresi";
                
                // Eğer çalışma süresi bitmişse, Pomodoro tamamlandı
                if (!isWorkTime) {
                    updateCompletedPomodoros();
                }
            }
        }, 1000);
        isRunning = true;
        startStopButton.textContent = "Duraklat";
    }
}

// Zamanlayıcıyı Sıfırla
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isWorkTime = true;
    remainingTime = WORK_TIME * 60;
    updateTime();
    timerLabel.textContent = "Çalışma Süresi";
    startStopButton.textContent = "Başlat";
}

// Süre Ayarlarını Uygula
function applySettings() {
    WORK_TIME = parseInt(workTimeInput.value);
    BREAK_TIME = parseInt(breakTimeInput.value);
    remainingTime = WORK_TIME * 60;
    updateTime();
    timerLabel.textContent = "Çalışma Süresi";
    resetTimer(); // Yeni ayarlara göre sıfırlama
}

// Olay Dinleyicileri
startStopButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", resetTimer);
applySettingsButton.addEventListener("click", applySettings);

// Sayfa Yüklendiğinde Varsayılan Zamanı Göster
updateTime();
