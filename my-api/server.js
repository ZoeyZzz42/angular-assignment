const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '55002',
  user: 'root',
  password: 'hallowelt', 
  database: 'userdb'
});

connection.connect();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err });
      } else {
        const user = { username, email, password: hash };
        const query = 'INSERT INTO users SET ?';
        connection.query(query, user, (error, results) => {
          if (error) throw error;
          res.status(201).send('User registered successfully');
        });
      }
    });
  });

  app.get('/users', (req, res) => {
    const query = 'SELECT id, username, email FROM users';
    connection.query(query, (error, results) => {
      if (error) {
        return res.status(500).send('Error fetching users');
      }
      res.json(results);
    });
  });

  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], async (error, results) => {
      if (error) {
        return res.status(500).send('Server error');
      }
      
      if (results.length === 0) {
        return res.status(401).send('User not found');
      }
  
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).send('Password is incorrect');
      }
  
      const token = jwt.sign({ userId: user.id }, 'my_key', { expiresIn: '1h' });
  
      res.status(200).json({ token });
    });
  });

  app.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
  
    let query = 'UPDATE users SET ';
    let values = [];

    if (username) {
        query += 'username = ?, ';
        values.push(username);
    }

    if (email) {
        query += 'email = ?, ';
        values.push(email);
    }

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        query += 'password = ?, ';
        values.push(hashedPassword);
    }

    query = query.slice(0, -2);
    
    query += ' WHERE id = ?';
    values.push(id);

    connection.query(query, values, (error, results) => {
        if (error) {
            return res.status(500).send('Server error');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('User not found');
        }

        res.status(200).send('User updated successfully');
    });
});

  app.delete('/user/:id', (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return res.status(500).send('Server error');
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).send('User not found');
      }
  
      res.status(204).send('User deleted successfully');
    });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
