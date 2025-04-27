const radioAudio = document.getElementById("radio-audio");
const playPauseBtn = document.getElementById("play-pause-btn");
const muteBtn = document.getElementById("mute-btn");
const volumeSlider = document.getElementById("volume-slider");

if (radioAudio) {
    radioAudio.volume = 0.5;

    playPauseBtn.addEventListener("click", () => {
        if (radioAudio.paused) {
            radioAudio.play();
            playPauseBtn.textContent = "⏸️";
        } else {
            radioAudio.pause();
            playPauseBtn.textContent = "▶️";
        }
    });

    muteBtn.addEventListener("click", () => {
        radioAudio.muted = !radioAudio.muted;
        muteBtn.textContent = radioAudio.muted ? "🔇" : "🔊";
    });

    volumeSlider.addEventListener("input", () => {
        radioAudio.volume = volumeSlider.value;
        radioAudio.muted = false;
        muteBtn.textContent = "🔊";
    });
}

// LOGIN
const loginBtn = document.getElementById("login-btn");
if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        if (!username || !password) {
            alert("Por favor ingresa usuario y contraseña.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                // Aquí puedes redirigir al usuario a la tienda o al panel principal
                // window.location.href = "tienda.html";
            } else {
                alert(data.message || 'Usuario o contraseña incorrectos.');
            }
        } catch (error) {
            alert('Error de conexión con el servidor.');
        }
    });
}
