document.addEventListener("DOMContentLoaded", () => {
  const bandSelect = document.getElementById("band-select");
  const frequencyContainer = document.getElementById("frequency-container");
  const frequencyRange = document.getElementById("frequency-range");
  const frequencyDisplay = document.getElementById("frequency-display");
  const musicContainer = document.getElementById("music-container");
  const musicList = document.getElementById("music-list");
  const playMusicBtn = document.getElementById("play-music-btn");
  const radioAudio = document.getElementById("radio-audio");

  let currentBand = bandSelect.value;
  let currentFrequency = frequencyRange.value;
  let currentMusic = "";

  function updateFrequencyDisplay() {
    frequencyDisplay.textContent = `${frequencyRange.value} ${currentBand.toUpperCase()}`;
  }

  function loadMusicList() {
    musicList.innerHTML = "<option>Cargando...</option>";
    fetch("/api/music-list")
      .then((res) => res.json())
      .then((data) => {
        musicList.innerHTML = "";
        if (data.length === 0) {
          musicList.innerHTML = "<option>No hay música disponible</option>";
          playMusicBtn.disabled = true;
        } else {
          data.forEach((song) => {
            const option = document.createElement("option");
            option.value = song.url;
            option.textContent = song.name;
            musicList.appendChild(option);
          });
          playMusicBtn.disabled = false;
        }
      })
      .catch(() => {
        musicList.innerHTML = "<option>Error al cargar la música</option>";
        playMusicBtn.disabled = true;
      });
  }

  bandSelect.addEventListener("change", () => {
    currentBand = bandSelect.value;
    if (currentBand === "music") {
      frequencyContainer.style.display = "none";
      musicContainer.style.display = "block";
      radioAudio.src = "";
      loadMusicList();
    } else {
      musicContainer.style.display = "none";
      frequencyContainer.style.display = "block";
      if (currentBand === "fm") {
        frequencyRange.min = 87.5;
        frequencyRange.max = 108;
        frequencyRange.step = 0.1;
        frequencyRange.value = 99.5;
      } else if (currentBand === "am") {
        frequencyRange.min = 530;
        frequencyRange.max = 1700;
        frequencyRange.step = 10;
        frequencyRange.value = 1000;
      }
      updateFrequencyDisplay();
      // Set radio stream URL based on band and frequency (placeholder)
      radioAudio.src = getStreamUrl(currentBand, frequencyRange.value);
      radioAudio.play();
    }
  });

  frequencyRange.addEventListener("input", () => {
    currentFrequency = frequencyRange.value;
    updateFrequencyDisplay();
    radioAudio.src = getStreamUrl(currentBand, currentFrequency);
    radioAudio.play();
  });

  playMusicBtn.addEventListener("click", () => {
    currentMusic = musicList.value;
    if (currentMusic) {
      radioAudio.src = currentMusic;
      radioAudio.play();
    }
  });

  function getStreamUrl(band, frequency) {
    // Placeholder function: in real app, map frequency to stream URL
    if (band === "fm") {
      return "http://streaming-url-fm-example";
    } else if (band === "am") {
      return "http://streaming-url-am-example";
    }
    return "";
  }

  // Initialize
  if (currentBand === "music") {
    frequencyContainer.style.display = "none";
    musicContainer.style.display = "block";
    loadMusicList();
  } else {
    frequencyContainer.style.display = "block";
    musicContainer.style.display = "none";
    updateFrequencyDisplay();
    radioAudio.src = getStreamUrl(currentBand, frequencyRange.value);
  }
});
