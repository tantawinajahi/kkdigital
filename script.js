// 1. Fetch JSON Data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Populate Nama pada Pintu Overlay
    document.getElementById('door-couple-names').innerText = `${data.brideName} & ${data.groomName}`;

    // Populate Hero Section
    document.getElementById('couple-names').innerText = `${data.brideName} & ${data.groomName}`;
    document.getElementById('wedding-date').innerText = data.formattedDate;

    // Populate Ceremony Details
    document.getElementById('ceremony-time').innerText = data.ceremony.time;
    document.getElementById('ceremony-venue').innerText = data.ceremony.venue;
    document.getElementById('ceremony-address').innerText = data.ceremony.address;
    document.getElementById('ceremony-map').href = data.ceremony.mapLink;

    // Populate Reception Details
    document.getElementById('reception-time').innerText = data.reception.time;
    document.getElementById('reception-venue').innerText = data.reception.venue;
    document.getElementById('reception-address').innerText = data.reception.address;
    document.getElementById('reception-map').href = data.reception.mapLink;

    // Populate Bank / QR Details
    document.getElementById('qr-image').src = data.bankDetails.qrImage;
    document.getElementById('bank-name').innerText = data.bankDetails.bankName;
    document.getElementById('account-no').innerText = data.bankDetails.accountNo;

    // Set URL Muzik dari JSON
    const audio = document.getElementById('wedding-audio');
    audio.src = data.musicUrl;

    // 2. Control Pintu Terbuka & Autoplay Muzik
    const openDoorBtn = document.getElementById('open-door-btn');
    const doorOverlay = document.getElementById('door-overlay');
    const musicBtn = document.getElementById('music-toggle-btn');
    const musicText = document.getElementById('music-text');
    const musicContainer = document.getElementById('music-toggle-btn');

    let isPlaying = false;

    // Fungsi Buka Pintu
    openDoorBtn.addEventListener('click', () => {
      // Tambah class untuk animasi pintu terbuka
      doorOverlay.classList.add('open');

      // Autoplay Muzik selepas tetamu tekan butang pintu
      audio.play().then(() => {
        isPlaying = true;
        if (musicText) musicText.innerText = "Pause Music";
        if (musicContainer) musicContainer.classList.add('playing');
      }).catch(err => {
        console.log("Audio play blocked or failed:", err);
      });
    });

    // Butang Floating Music Toggle (jika tetamu nak pause/play semula nanti)
    if (musicBtn) {
      musicBtn.addEventListener('click', () => {
        if (isPlaying) {
          audio.pause();
          musicText.innerText = "Play Music";
          musicContainer.classList.remove('playing');
          isPlaying = false;
        } else {
          audio.play().then(() => {
            musicText.innerText = "Pause Music";
            musicContainer.classList.add('playing');
            isPlaying = true;
          });
        }
      });
    }

    // 3. Start Countdown Timer
    startCountdown(data.weddingDate);
  })
  .catch(error => console.error('Error loading wedding data:', error));

// Countdown Function
function startCountdown(dateString) {
  const weddingDate = new Date(dateString).getTime();

  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      document.getElementById("countdown").innerHTML = "<h3>The Wedding Day is Here!</h3>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
  };

  setInterval(updateTimer, 1000);
  updateTimer();
}

// Smooth scrolling untuk menu navigasi bawah
document.querySelectorAll('.nav__link').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if(targetId && targetId.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });
});