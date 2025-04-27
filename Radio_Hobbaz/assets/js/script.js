const audio = document.getElementById("intro-audio");
const muteBtn = document.getElementById("mute-btn");
const volumeSlider = document.getElementById("volume-slider");

if (audio) {
    audio.volume = 0.5;

    muteBtn.addEventListener("click", () => {
        audio.muted = !audio.muted;
        muteBtn.textContent = audio.muted ? "🔇" : "🔊";
    });

    volumeSlider.addEventListener("input", () => {
        audio.volume = volumeSlider.value;
        audio.muted = false;
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
