require('dotenv').config();

import express from 'express';
import { json } from 'body-parser';
import { createPool } from 'mysql2/promise';
import { hash, compare } from 'bcrypt';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(json());

// Initialize MySQL connection pool
const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Create users table if it doesn't exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
`;

(async () => {
    try {
        const connection = await pool.getConnection();
        await connection.query(createTableQuery);
        connection.release();
        console.log('Tabla users creada o ya existe.');
    } catch (err) {
        console.error('Error creando tabla users:', err);
    }
})();

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Faltan campos requeridos.' });
    }

    try {
        const hashedPassword = await hash(password, 10);
        const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        await pool.query(insertQuery, [username, email, hashedPassword]);
        res.status(201).json({ message: 'Usuario registrado con éxito.' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'El nombre de usuario ya está registrado.' });
        }
        res.status(500).json({ message: 'Error al registrar usuario.' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Faltan campos requeridos.' });
    }

    try {
        const selectQuery = 'SELECT * FROM users WHERE username = ?';
        const [rows] = await pool.query(selectQuery, [username]);
        const user = rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
        }

        const match = await compare(password, user.password);
        if (match) {
            res.json({ message: 'Inicio de sesión exitoso.' });
        } else {
            res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar usuario.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor backend escuchando en el puerto ${port}`);
});
