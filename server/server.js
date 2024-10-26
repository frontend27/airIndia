// index.js
const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const db = require('./config/db');
const multer = require('multer');
const path = require('path');


const app = express();
app.use(bodyParser.json());

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
      [username, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

//
app.post('/login', (req, res)=>{
  const {username, password} = res.body;

  db.query(
    'SELECT * FROM register WHERE username = ?',
    [username],
    async(err, result)=>{
      if(err){
        console.error('Database error:', err);
        return res.status(401).json({ error: 'Database errro'})
      }
      if(result.lenght === 0){
        return res.status(401).json({ error: 'Invalid username or password'})
      }
      const user = result[0];
      //compare password
      const match = await bcrypt.compare(password, user.password);

      if(!match){
        return res.status(401).json({ error: 'Invalid username or password' })
      }
      res.status(200).json({ message: 'Login successful!' });
    }
  )
})

// Configure multer for file storage
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
