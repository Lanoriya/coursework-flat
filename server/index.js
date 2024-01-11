const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'FlatDB',
  password: 'artas',
  port: 5432,
});

app.use(cors({
  origin: 'http://localhost:3000', // Укажите домен вашего клиента
  credentials: true,
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Укажите домен вашего клиента
  res.header('Vary', 'Origin');
  next();
});

app.use(express.json());

const secretKey = crypto.randomBytes(32).toString('hex');

function checkAdminToken(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authToken.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey);

    if (decoded.role === 'admin') {
      // Проверьте срок действия токена
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp - currentTime < 900) {
        // Если срок действия остался менее 15 минут, создайте новый токен и отправьте его
        const newToken = jwt.sign(
          { adminId: decoded.adminId, username: decoded.username, role: 'admin' },
          secretKey,
          { expiresIn: '1h' }
        );
        res.setHeader('Authorization', `Bearer ${newToken}`);
      }

      // Продолжите выполнение запроса
      next();
    } else {
      res.status(403).json({ error: 'Доступ запрещен' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  // Хешируйте пароль перед сохранением его в базе данных
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await pool.query(
      'INSERT INTO Users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, role]
    );

    // Создайте JWT токен и отправьте его пользователю, если это необходимо
    const token = jwt.sign({ username, role }, secretKey);

    res.status(201).json({ message: 'Пользователь зарегистрирован', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка регистрации пользователя' });
  }
});

app.post('/api/admin/login', async (req, res) => {
  console.log('Received admin login request');
  const { username, password } = req.body;
  try {
    const admin = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (admin.rows.length === 0) {
      // Логин не существует
      return res.status(401).send('Неверный логин');
    }

    const hashedPassword = admin.rows[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
      // Верный логин и пароль
      const token = jwt.sign({ adminId: admin.rows[0].id, username, role: 'admin' }, secretKey, {
        expiresIn: '12h',
      });
      res.cookie('adminToken', token, { httpOnly: true, maxAge: 3600000, sameSite: 'None', secure: true, path: '/' });
      return res.status(200).json({ message: 'Admin login successful', adminId: admin.rows[0].id, token });
    } else {
      // Логин верный, но пароль неверный
      return res.status(401).send('Неверный пароль');
    }
  } catch (error) {
    console.error('Error during admin login:', error);
    return res.status(500).json({ error: 'Admin login failed' });
  }
});

// Маршрут для доступа к административным функциям
app.get('/api/admin', checkAdminToken, (req, res) => {
  res.json({ message: 'Добро пожаловать, администратор!' });
});

app.post('/api/admin/addApartment', checkAdminToken, async (req, res) => {
  const {
    room_count,
    area,
    floor,
    price,
    apartment_number,
    building_id,
    entrance,
  } = req.body;

  try {
    // Выполнение запроса к базе данных для добавления квартиры
    const newApartment = await pool.query(
      'INSERT INTO apartments (room_count, area, floor, price, apartment_number, building_id, entrance) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [room_count, area, floor, price, apartment_number, building_id, entrance]
    );

    res.status(201).json(newApartment.rows[0]);
  } catch (error) {
    console.error('Ошибка при добавлении квартиры:', error);
    res.status(500).json({ error: 'Ошибка при добавлении квартиры' });
  }
});

app.post('/api/admin/addBuilding', checkAdminToken, async (req, res) => {
  const {
    total_apartments,
    total_entrances,
  } = req.body;

  try {
    const newBuilding = await pool.query(
      'INSERT INTO buildings (total_apartments, total_entrances) VALUES ($1, $2) RETURNING *',
      [total_apartments, total_entrances]
    );

    res.status(201).json(newBuilding.rows[0]);
  } catch (error) {
    console.error('Ошибка при добавлении здания:', error);
    res.status(500).json({ error: 'Ошибка при добавлении здания' });
  }
})

app.get('/api/admin/apartments', checkAdminToken, async (req, res) => {
  const { sortField, sortOrder } = req.query;
  try {
    const apartment = `SELECT * FROM apartments ORDER BY ${sortField} ${sortOrder}`;
    const result = await pool.query(apartment)

    return res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ error: 'Error updating apartments' });
  }
})

app.put('/api/admin/apartments', checkAdminToken, async (req, res) => {
  const updatedApartments = req.body; // Получите обновленные данные квартир из тела запроса

  try {
    // Цикл по массиву обновленных квартир и выполнение SQL-запросов для обновления каждой из них
    for (const apartment of updatedApartments) {
      const query = `
        UPDATE apartments
        SET room_count = $1, area = $2, floor = $3, price = $4, apartment_number = $5, building_id = $6, entrance = $7
        WHERE apartment_id = $8
      `;
      // Предполагается, что у квартир есть уникальный идентификатор (id) в базе данных

      await pool.query(query, [
        apartment.room_count,
        apartment.area,
        apartment.floor,
        apartment.price,
        apartment.apartment_number,
        apartment.building_id,
        apartment.entrance,
        apartment.apartment_id, // Уникальный идентификатор квартиры
      ]);
    }

    res.status(200).json({ message: 'Данные о квартирах успешно обновлены' });
  } catch (error) {
    console.error('Ошибка при обновлении данных о квартирах:', error);
    res.status(500).json({ error: 'Ошибка при обновлении данных о квартирах' });
  }
});

app.listen(port, () => {
  console.log(`Сервер работает на порту ${port}.`);
});
