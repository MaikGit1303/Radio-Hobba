const createBtn = document.getElementById("create-account-btn");

createBtn.addEventListener("click", async () => {
    const username = document.getElementById("new-username").value.trim();
    const email = document.getElementById("new-email").value.trim();
    const password = document.getElementById("new-password").value;
    const confirm = document.getElementById("confirm-password").value;

    if (!username || !email || !password || !confirm) {
        alert("Por favor completa todos los campos.");
        return;
    }

    if (password !== confirm) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = "index.html"; // Redirige al login
        } else {
            alert(data.message || 'Error al registrar usuario.');
        }
    } catch (error) {
        alert('Error de conexión con el servidor.');
    }
});
