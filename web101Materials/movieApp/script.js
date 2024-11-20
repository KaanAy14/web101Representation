// DOM Elementlerini Seçme
const form = document.getElementById('add-film-form');
const filmTitleInput = document.getElementById('film-title');
const filmGenreInput = document.getElementById('film-genre');
const filmYearInput = document.getElementById('film-year');
const filmList = document.getElementById('films');

// Film Ekleme İşlevi
function addFilm(event) {
    event.preventDefault(); // Sayfanın yenilenmesini önler

    // Giriş değerlerini al
    const title = filmTitleInput.value;
    const genre = filmGenreInput.value;
    const year = filmYearInput.value;

    // Eğer alanlardan biri boşsa işlem yapma
    if (!title || !genre || !year) {
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    // Yeni film öğesi oluştur
    const filmItem = document.createElement('li');
    filmItem.innerHTML = `
        <span><strong>${title}</strong> (${year}) - ${genre}</span>
        <button class="delete-film">Sil</button>
    `;

    // Listeye ekle
    filmList.appendChild(filmItem);

    // Formu sıfırla
    form.reset();
}

// Film Silme İşlevi
function deleteFilm(event) {
    if (event.target.classList.contains('delete-film')) {
        const filmItem = event.target.parentElement;
        filmList.removeChild(filmItem);
    }
}

// Olay Dinleyicileri
form.addEventListener('submit', addFilm);
filmList.addEventListener('click', deleteFilm);
