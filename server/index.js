const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3001;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'flatDB',
  password: 'artas',
  port: 5432,
});

dotenv.config();

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

app.use(cookieParser());
app.use(express.json());

const secretKey = process.env.SECRET_KEY || 'default-secret-key';
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;

function generateResetToken() {
  return uuidv4();
}

async function sendPasswordResetEmail(email, resetToken) {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 25,
    secure: false,
    auth: {
      user: emailUser,
      pass: emailPassword
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: 'lanoland@fuck.com',
    to: email,
    subject: 'Восстановление пароля',
    text: `Для восстановления пароля перейдите по ссылке: http://localhost:3000/reset-password/${email+'/'+resetToken}`,
    html: `<p>Для восстановления пароля перейдите по <a href="http://localhost:3000/reset-password/${email+'/'+resetToken}">ссылке</a>.</p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // Проверяем, существует ли пользователь с такой почтой
  const user = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
  if (!user.rows.length) {
    return res.status(404).json({ error: 'Пользователь с такой почтой не найден' });
  }

  // Время жизни токена (15 минут)
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  // Генерируем уникальный токен для запроса сброса пароля
  const resetToken = generateResetToken();

  // Сохраняем токен сброса пароля в базе данных или кэше
  await pool.query(
    'INSERT INTO passwordresettokens (email, token, expires_at) VALUES ($1, $2, $3)',
    [email, resetToken, expiresAt]
  );

  // Отправляем электронное письмо с ссылкой для сброса пароля
  try {
    await sendPasswordResetEmail(email, resetToken);
    res.status(200).json({ message: 'На вашу почту отправлена ссылка для сброса пароля' });
  } catch (error) {
    console.error('Ошибка отправки электронной почты:', error);
    res.status(500).json({ error: 'Ошибка отправки электронной почты' });
  }
});
  
app.post('/reset-password', async (req, res) => {
  const { email, resetToken, newPassword } = req.body;

  // Проверяем, действителен ли токен сброса пароля
  const tokenResult = await pool.query('SELECT * FROM PasswordResetTokens WHERE email = $1 AND token = $2', [email, resetToken]);
  if (!tokenResult.rows.length) {
    return res.status(400).json({ error: 'Недействительный токен сброса пароля' });
  }

  // Хешируем новый пароль
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Обновляем пароль пользователя в базе данных
  await pool.query('UPDATE Users SET password = $1 WHERE email = $2', [hashedPassword, email]);

  // Удаляем токен сброса пароля из базы данных или кэша
  await pool.query('DELETE FROM PasswordResetTokens WHERE email = $1 AND token = $2', [email, resetToken]);

  res.status(200).json({ message: 'Пароль успешно сброшен' });
});

function checkAdminToken(req, res, next) {
  const authToken = req.cookies.adminToken; // Получаем токен из куки

  if (!authToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(authToken, secretKey);

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
        res.cookie('adminToken', newToken, { httpOnly: true, maxAge: 3600000, sameSite: 'None', secure: true, path: '/' });
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
  const { username, password, email, role } = req.body;

  // Хешируйте пароль перед сохранением его в базе данных
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await pool.query(
      'INSERT INTO Users (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, hashedPassword, email, role]
    );

    const userId = user.rows[0].id;
    await pool.query(
      'INSERT INTO UserSettings (user_id) VALUES ($1)',
      [userId]
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

// Вход пользователя
app.post('/api/user/login', async (req, res) => {
  console.log('Received user login request');
  const { usernameOrEmail, password } = req.body;
  try {
    // Проверка, является ли введенное значение адресом электронной почты
    let user;
    if (usernameOrEmail.includes('@')) {
      // Вход с использованием электронной почты
      user = await pool.query('SELECT * FROM users WHERE email = $1', [usernameOrEmail]);
    } else {
      // Вход с использованием имени пользователя
      user = await pool.query('SELECT * FROM users WHERE username = $1', [usernameOrEmail]);
    }

    if (user.rows.length === 0) {
      // Пользователь не существует
      return res.status(401).send('Пользователь с таким именем или адресом электронной почты не найден');
    }

    const hashedPassword = user.rows[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
      // Верный логин и пароль
      const token = jwt.sign({ userId: user.rows[0].id, username: user.rows[0].username, role: 'user' }, secretKey, {
        expiresIn: '12h',
      });
      res.cookie('userToken', token, { httpOnly: true, maxAge: 3600000, sameSite: 'None', secure: true, path: '/' });
      return res.status(200).json({ message: 'Успешный вход пользователя', userId: user.rows[0].id, token });
    } else {
      // Верный логин, но неверный пароль
      return res.status(401).send('Неверный пароль');
    }
  } catch (error) {
    console.error('Error during user login:', error);
    return res.status(500).json({ error: 'Ошибка входа пользователя' });
  }
});

app.get('/api/user/profile', async (req, res) => {
  try {
    const userToken = req.cookies.userToken;

    // Проверяем, есть ли токен
    if (!userToken) {
      return res.status(401).json({ error: 'Токен пользователя отсутствует' });
    }

    // Расшифровываем токен, чтобы получить данные пользователя
    const decoded = jwt.verify(userToken, secretKey);

    // Предполагается, что данные о пользователе хранятся в базе данных
    // Выполняем запрос к базе данных для получения данных о пользователе по имени пользователя
    const userData = await pool.query('SELECT * FROM Users WHERE username = $1', [decoded.username]);

    // Проверяем, найден ли пользователь в базе данных
    if (userData.rows.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    // Получаем данные о пользователе из таблицы UserSettings
    const userSettingsData = await pool.query('SELECT * FROM UserSettings WHERE user_id = $1', [userData.rows[0].id]);

    // Предполагаем, что пользователь найден и имеет настройки в UserSettings
    const userProfileData = {
      ...userData.rows[0],
      settings: userSettingsData.rows[0] // Добавляем информацию о настройках пользователя
    };

    // Отправляем данные о пользователе клиенту
    res.status(200).json(userProfileData);
  } catch (error) {
    console.error('Ошибка при получении информации о пользователе:', error);
    res.status(500).json({ error: 'Ошибка при получении информации о пользователе' });
  }
});

app.post('/api/user/updateProfile', async (req, res) => {
  try {
    const userToken = req.cookies.userToken;
    const { name, phone_number } = req.body; // Получаем новые данные имени и номера телефона из тела запроса

    // Расшифровываем токен, чтобы получить данные пользователя
    const decoded = jwt.verify(userToken, secretKey);

    // Выполняем запрос к базе данных для обновления данных пользователя
    await pool.query('UPDATE UserSettings SET name = $1, phone_number = $2 WHERE user_id = $3', [name, phone_number, decoded.userId]);

    res.status(200).json({ message: 'Профиль успешно обновлен' });
  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
    res.status(500).json({ error: 'Ошибка при обновлении профиля' });
  }
});

app.post('/api/user/uploadPhoto', upload.single('photo'), async (req, res) => {
  try {
    const userToken = req.cookies.userToken;

    // Расшифровываем токен, чтобы получить данные пользователя
    const decoded = jwt.verify(userToken, secretKey);

    const photoExtension = req.file.originalname.split('.').pop(); // Получаем расширение файла
    const newFileName = `logo_${decoded.userId}.${photoExtension}`; // Формируем новое имя файла
    const photoUrl = path.join('uploads/usersLogos', newFileName); // Формируем путь к новому файлу

    // Сохраняем фотографию с новым именем
    await fs.rename(req.file.path, path.join(__dirname, photoUrl));

    // Сохраняем путь к фотографии в базе данных для данного пользователя
    await pool.query('UPDATE UserSettings SET photo_url = $1 WHERE user_id = $2', [photoUrl, decoded.userId]);

    res.status(200).json({ message: 'Фотография успешно загружена' });
  } catch (error) {
    console.error('Ошибка при загрузке фотографии:', error);
    res.status(500).json({ error: 'Ошибка при загрузке фотографии' });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/user/deals', async (req, res) => {
  try {
    const userToken = req.cookies.userToken;

    // Проверяем, есть ли токен
    if (!userToken) {
      return res.status(401).json({ error: 'Токен пользователя отсутствует' });
    }

    // Расшифровываем токен, чтобы получить данные пользователя
    const decoded = jwt.verify(userToken, secretKey);

    // Выполняем запрос к базе данных для получения заявок пользователя
    const userDeals = await pool.query('SELECT apartment_id, status, created_at FROM orders WHERE user_id = $1', [decoded.userId]);

    // Отправляем данные о заявках пользователя клиенту
    res.status(200).json(userDeals.rows);
  } catch (error) {
    console.error('Ошибка при получении заявок пользователя:', error);
    res.status(500).json({ error: 'Ошибка при получении заявок пользователя' });
  }
});

app.post('/api/user/startDeal', async (req, res) => {
  try {
    // Получаем данные из тела запроса
    const { name, phoneNumber, apartmentId, status, userId } = req.body;

    // Выполняем запрос к базе данных для создания сделки
    const newDeal = await pool.query(
      'INSERT INTO orders (name, phone_number, apartment_id, status, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, phoneNumber, apartmentId, status, userId]
    );

    res.status(200).json(newDeal.rows[0]); // Отправляем созданную сделку клиенту
  } catch (error) {
    console.error('Ошибка при начале сделки:', error);
    res.status(500).json({ error: 'Ошибка при начале сделки' });
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
    building_name,
    entrance,
    image_id,
  } = req.body;
  try {
    // Находим building_id по building_name
    const building = await pool.query('SELECT building_id FROM buildings WHERE building_name = $1', [building_name]);

    if (building.rows.length === 0) {
      // Если здание с таким именем не найдено, возвращаем ошибку
      return res.status(400).json({ error: 'Здание не найдено' });
    }

    const building_id = building.rows[0].building_id;

    // Выполнение запроса к базе данных для добавления квартиры
    const newApartment = await pool.query(
      'INSERT INTO apartments (room_count, area, floor, price, apartment_number, building_id, entrance, image_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [room_count, area, floor, price, apartment_number, building_id, entrance, image_id]
    );

    res.status(201).json(newApartment.rows[0]);
  } catch (error) {
    console.error('Ошибка при добавлении квартиры:', error);
    res.status(500).json({ error: 'Ошибка при добавлении квартиры' });
  }
});
app.post('/api/admin/addBuilding', checkAdminToken, async (req, res) => {
  const {
    building_name,
    total_apartments,
    total_entrances,
    completion_date,
    material,
  } = req.body;

  try {
    const newBuilding = await pool.query(
      'INSERT INTO buildings (building_name, total_apartments, total_entrances, completion_date, material) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [building_name, total_apartments, total_entrances, completion_date, material]
    );

    res.status(201).json(newBuilding.rows[0]);
  } catch (error) {
    console.error('Ошибка при добавлении здания:', error);
    res.status(500).json({ error: 'Ошибка при добавлении здания' });
  }
})

app.get('/api/admin/buildings', checkAdminToken, async (req, res) => {
  try {
    const query = 'SELECT * FROM buildings';
    console.log('SQL Query:', query);

    const result = await pool.query(query);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching buildings:', error);
    res.status(500).json({ error: 'Error updating buildings' });
  }
});

app.put('/api/admin/buildings', checkAdminToken, async (req, res) => {
  const updatedBuildingData = req.body;
  try { 
    for (const building of updatedBuildingData) {
      const query = `
      UPDATE buildings
      SET building_name = $1, total_apartments = $2, total_entrances = $3, completion_date = $4, material = $5
      WHERE building_id = $6
    `; 
    
    const formatDateTime = (dateTimeString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateTimeString).toLocaleString('ru-RU', options);
    };

    await pool.query(query, [
      building.building_name,
      building.total_apartments,
      building.total_entrances,
      formatDateTime(building.completion_date),
      building.material,
      building.building_id
    ])
    }
    res.status(200).json({ message: 'Данные о домах успешно обновлены' });
  } catch (error) {
    console.error('Error updating building:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/building_images/:buildingId/photos', checkAdminToken, async (req, res) => {
  try {
    const { buildingId } = req.params;
    const query = 'SELECT * FROM building_images WHERE building_id = $1';
    const result = await pool.query(query, [buildingId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching building photos:', error);
    res.status(500).json({ error: 'Error fetching building photos' });
  }
});

app.delete('/api/admin/building_images/:imageId', checkAdminToken, async (req, res) => {
  const { imageId } = req.params;
  try {
    // Удаляем запись из базы данных
    const deleteQuery = 'DELETE FROM building_images WHERE image_id = $1 RETURNING image_url';
    const result = await pool.query(deleteQuery, [imageId]);
    const imageUrl = result.rows[0].image_url;

    // Удаляем файл изображения
    fs.unlink(imageUrl, (err) => {
      if (err) {
        console.error('Error deleting image file:', err);
        res.status(500).json({ error: 'Ошибка при удалении файла изображения' });
        return;
      }

      res.status(200).json({ message: 'Фотография успешно удалена' });
    });
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ error: 'Ошибка при удалении фотографии' });
  }
});


app.post('/api/admin/uploadLayout', checkAdminToken, upload.single('photo'), async (req, res) => {
  try {
    const photo = req.file;
    const buildingId = req.body.building_id; // Получаем building_id из тела запроса
    const fileName = 'house_' + buildingId + '_' + photo.originalname;
    const filePath = path.join('uploads/layouts', fileName);
    
    // Проверяем, существует ли уже файл с таким именем
    const existingFile = await pool.query('SELECT * FROM building_images WHERE image_url = $1', [filePath]);
    if (existingFile.rows.length > 0) {
      console.log('Файл с таким именем уже существует:', fileName);
      await fs.unlink(req.file.path); // Удаляем загруженный файл
      res.status(400).json({ error: 'Файл с таким именем уже существует' });
      return;
    }

    // Записываем данные изображения из буфера
    await fs.rename(req.file.path, path.join(__dirname, filePath));

    await pool.query('INSERT INTO building_images (building_id, image_url) VALUES ($1, $2)', [buildingId, filePath]);

    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
});

app.get('/api/admin/apartments', checkAdminToken, async (req, res) => {
  try {
    const { sortField, sortOrder, status } = req.query; // Добавили параметр status
    const defaultSortField = 'apartment_id';
    let query = `SELECT * FROM apartments`;

    // Если задан параметр status, добавляем его в WHERE-условие
    if (status) {
      query += ` WHERE status = '${status}'`;
    }

    // Добавляем сортировку
    query += ` ORDER BY ${sortField || defaultSortField} ${sortOrder === 'desc' ? 'DESC' : 'ASC'}`;

    console.log('SQL Query:', query);

    const result = await pool.query(query);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching apartments:', error);
    res.status(500).json({ error: 'Error updating apartments' });
  }
});

app.put('/api/admin/apartments', checkAdminToken, async (req, res) => {
  const updatedApartments = req.body; // Получите обновленные данные квартир из тела запроса
  try {
    // Цикл по массиву обновленных квартир и выполнение SQL-запросов для обновления каждой из них
    for (const apartment of updatedApartments) {
      const query = `
        UPDATE apartments
        SET room_count = $1, area = $2, floor = $3, price = $4, apartment_number = $5, building_id = $6, entrance = $7, booking_date = $8, status = $9
        WHERE apartment_id = $10
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
        apartment.booking_date, // Добавляем booking_date
        apartment.status, // Добавляем status
        apartment.apartment_id, // Уникальный идентификатор квартиры
      ]);
    }

    res.status(200).json({ message: 'Данные о квартирах успешно обновлены' });
  } catch (error) {
    console.error('Ошибка при обновлении данных о квартирах:', error);
    res.status(500).json({ error: 'Ошибка при обновлении данных о квартирах' });
  }
});

app.delete('/api/admin/apartments/:id', checkAdminToken, async (req, res) => {
  const apartmentId = req.params.id;

  try {
    // Проверяем, существует ли квартира с указанным id
    const checkQuery = 'SELECT * FROM apartments WHERE apartment_id = $1';
    const checkResult = await pool.query(checkQuery, [apartmentId]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Квартира не найдена' });
    }

    // Выполняем запрос к базе данных для удаления квартиры
    const deleteQuery = 'DELETE FROM apartments WHERE apartment_id = $1';
    await pool.query(deleteQuery, [apartmentId]);

    res.status(204).send();
  } catch (error) {
    console.error('Ошибка при удалении квартиры:', error);
    res.status(500).json({ error: 'Ошибка при удалении квартиры' });
  }
});

app.get('/api/apartments', async (req, res) => {
  try {
    const { sortField, sortOrder, minArea, maxArea, minFloor, maxFloor } = req.query;
    const defaultSortField = 'apartment_id';
    
    // Добавляем условия фильтрации
    let filterConditions = '';
    if (minArea && maxArea) {
      filterConditions += ` AND area BETWEEN ${minArea} AND ${maxArea}`;
    }
    if (minFloor && maxFloor) {
      filterConditions += ` AND floor BETWEEN ${minFloor} AND ${maxFloor}`;
    }

    const query = `
      SELECT * FROM apartments 
      WHERE 1=1 ${filterConditions} 
      ORDER BY ${sortField || defaultSortField} ${sortOrder === 'desc' ? 'DESC' : 'ASC'}`;
      
    console.log('SQL Query:', query);

    const result = await pool.query(query);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching apartments:', error);
    res.status(500).json({ error: 'Error retrieving apartments' });
  }
});

app.get('/api/apartments/:id', async (req, res) => {
  const apartmentId = req.params.id;

  try {
    // Здесь выполните запрос к базе данных для получения данных о квартире по ID
    const query = 'SELECT * FROM apartments WHERE apartment_id = $1';
    const result = await pool.query(query, [apartmentId]);

    if (result.rows.length > 0) {
      const apartmentData = result.rows[0];
      res.status(200).json(apartmentData);
    } else {
      res.status(404).json({ error: 'Квартира не найдена' });
    }
  } catch (error) {
    console.error('Ошибка при получении данных о квартире:', error);
    res.status(500).json({ error: 'Ошибка при получении данных о квартире' });
  }
});

app.get('/api/image/:image_id', async (req, res) => {
  const imageId = req.params.image_id;

  try {
    const result = await pool.query('SELECT image_url FROM images WHERE image_id = $1', [imageId]);

    if (result.rows.length > 0) {
      const imageUrl = result.rows[0].image_url;
      res.redirect(imageUrl); // Перенаправляем запрос на URL изображения
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Error retrieving image' });
  }
});

app.get('/api/admin/orders', checkAdminToken, async (req, res) => {
  try {
    const { status } = req.query;

    let query = 'SELECT * FROM orders';
    
    if (status && status !== 'Все') {
      query += ' WHERE status = $1';
    }

    query += ' ORDER BY order_id';

    const result = await pool.query(query, status && status !== 'Все' ? [status] : []);
    const orders = result.rows;

    if (orders.length === 0) {
      return res.status(404).json({ error: 'Заказы не найдены' });
    }
    
    res.status(200).json(orders);
  } catch (error) {
    console.error('Ошибка при получении данных о заказах:', error);
    res.status(500).json({ error: 'Ошибка при получении данных о заказах' });
  }
});

app.put('/api/admin/orders', checkAdminToken, async (req, res) => {
  const updatedOrders = req.body; // Получите обновленные данные заказов из тела запроса
  try {
    for (const order of updatedOrders) {
      const query = `
        UPDATE orders
        SET name = $1, phone_number = $2, status = $3, about = $4
        WHERE order_id = $5
      `;

      await pool.query(query, [
        order.name,
        order.phone_number,
        order.status,
        order.about,
        order.order_id,
      ]);
    }

    res.status(200).json({ message: 'Данные о заказах успешно обновлены' });
  } catch (error) {
    console.error('Ошибка при обновлении данных о заказах:', error);
    res.status(500).json({ error: 'Ошибка при обновлении данных о заказах' });
  }
});

app.delete('/api/admin/orders/:id', checkAdminToken, async (req, res) => {
  const orderId = req.params.id;

  try {
    // Проверяем, существует ли заказ с указанным id
    const checkQuery = 'SELECT * FROM orders WHERE order_id = $1';
    const checkResult = await pool.query(checkQuery, [orderId]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Заказ не найден' });
    }

    // Выполняем запрос к базе данных для удаления заказа
    const deleteQuery = 'DELETE FROM orders WHERE order_id = $1';
    await pool.query(deleteQuery, [orderId]);

    res.status(204).send();
  } catch (error) {
    console.error('Ошибка при удалении заказа:', error);
    res.status(500).json({ error: 'Ошибка при удалении заказа' });
  }
});

app.post('/submitOrder', async (req, res) => {
  const { name, phone_number, apartment_id, user_id } = req.body;
  try {
    const result = await pool.query('INSERT INTO orders (name, phone_number, apartment_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *', [
      name,
      phone_number,
      apartment_id,
      user_id,
    ]);
    res.status(200).json({ message: 'Данные успешно получены и обработаны' });
  } catch (error) {
    console.error('Ошибка при обработке данных:', error);
    res.status(500).json({ error: 'Ошибка при обработке данных' });
  }
});

app.post('/submitOrderNotLogin', async (req, res) => {
  const { name, phone_number, apartment_id, user_id} = req.body;
  console.log(req.body)
  try {
    const result = await pool.query('INSERT INTO orders (name, phone_number, apartment_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *', [
      name,
      phone_number,
      apartment_id,
      user_id,
    ]);
    res.status(200).json({ message: 'Данные успешно получены и обработаны' });
  } catch (error) {
    console.error('Ошибка при обработке данных:', error);
    res.status(500).json({ error: 'Ошибка при обработке данных' });
  }
});

app.listen(port, () => {
  console.log(`Сервер работает на порту ${port}.`);
});
