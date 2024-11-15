// index.js
const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const db = require('./config/db');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// Enable CORS for all routes
const SECRET_KEY = 'ASFDGHFH12FG';

const app = express();
app.use(bodyParser.json());
app.use(cors());
// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const [result] = await db.execute(
      'INSERT INTO register (username, password) VALUES (?, ?)',
      [username, password]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

//
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT * FROM register WHERE username = ?`;
  db.query(sql, [username], async (err, results) => {
      if (err) return res.status(500).send('Server error');
      if (results.length === 0) return res.status(401).send('User not found');

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(401).send('Invalid credentials');

      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
          expiresIn: '1h'
      });

      res.json({ token });
  });
});



// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// Image upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
  const filename = req.file.filename;
  const path = '/uploads/' + filename;

  // Insert image metadata into database
  const query = `INSERT INTO image (filename, path) VALUES (?, ?)`;
  db.query(query, [filename, path], (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: 'Image uploaded successfully', path: path });
  });
});

// Fetch images endpoint
app.get('/images', (req, res) => {
  const sql = 'SELECT * FROM image';
  
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});
// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// get all register user
app.get('/users', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM register');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});
//annual product
app.post('/annualProduct', (req, res)=>{
  const {agriculture, menerals, industry, others, years} = req.body;
  const query = 'INSERT INTO annual_product(agriculture, menerals, industry, others, years) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [agriculture, menerals, industry, others, years], (err, result)=>{
    if(err){
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: result.insertId, agriculture, menerals, industry, others, years });
  })
})
//create annual report list
app.get('/annualReport', async(req, res) => {
  //const query = 'SELECT * FROM annual_product';
  try {
    const [rows] = await db.execute('SELECT * FROM annual_product');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});
// Create a new user
app.post('/trains', (req, res) => {
  const { train_name, train_number, departure, destination, departure_time, arrival_time } = req.body;
  const query = 'INSERT INTO train (train_name, train_number, departure, destination, departure_time, arrival_time) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [train_name, train_number, departure, destination, departure_time, arrival_time], (err, result) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.status(201).json({ id: result.insertId, train_name, train_number, departure, destination, departure_time, arrival_time });
  });
});
//get train
app.get('/trains', (req, res) => {
  const query = 'SELECT * FROM train';
  db.query(query, (err, results) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.status(200).json(results);
  });
});
app.get('/trains/:id', (req, res) => {
  const query = 'SELECT * FROM train WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      if (results.length === 0) {
          res.status(404).json({ error: 'trains not found' });
          return;
      }
      res.status(200).json(results[0]);
  });
});
// Update a user by ID
app.put('/trains/:id', (req, res) => {
  const { train_name, train_number, departure, destination, departure_time, arrival_time } = req.body;
  const query = 'UPDATE train SET train_name = ?, train_number = ?, departure = ?, destination = ?, departure_time = ?, arrival_time = ? WHERE id = ?';
  db.query(query, [train_name, train_number, departure, destination, departure_time, arrival_time, req.params.id], (err, result) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      if (result.affectedRows === 0) {
          res.status(404).json({ error: 'train not found' });
          return;
      }
      res.status(200).json({ message: 'train updated successfully' });
  });
});
// Delete a user by ID
app.delete('/trains/:id', (req, res) => {
  const query = 'DELETE FROM train WHERE id = ?';
  db.query(query, [req.params.id], (err, result) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      if (result.affectedRows === 0) {
          res.status(404).json({ error: 'User not found' });
          return;
      }
      res.status(200).json({ message: 'User deleted successfully' });
  });
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
