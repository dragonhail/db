const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT;

const cors = require('cors');
app.use(cors());

/// MySQL 데이터베이스 연결 정보
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

/// MySQL에서 데이터를 조회하는 API
app.get('/', async (req, res) => {
    try {
        // MySQL 연결
        const connection = await mysql.createConnection(dbConfig);

        // 데이터 조회
        const [rows] = await connection.query('SELECT * FROM users');

        // JSON 형식으로 반환
        res.json(rows);
    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({ error: 'Failed to fetch data from database' });
    }
});

// 헬스체크
app.get('/health', (req, res) => {
    // 헬스체크 상태 반환
    res.status(200).json({ status: 'healthy' });
});


// 서버 실행
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});