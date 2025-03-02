const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Import the database connection

// Get all users
router.get('/', (req, res) => {
  db.all(`SELECT * FROM member`, (err, rows) => {
    if (err) {
      res.status(500).send(`Error retrieving members: \${err.message}`);
    } else {
      res.json(rows);
    }
  });
});

// Get a single user by ID
router.get('/:uuid', (req, res) => {
  const uuid = req.params.uuid;
  db.get(`SELECT * FROM member WHERE uuid = ?`, [uuid], (err, row) => {
    if (err) {
      res.status(500).send(`Error retrieving member: ${err.message}`);
    } else if (!row) {
      res.status(404).send(`Member with UUID  ${uuid} not found.`);
    } else {
      res.json(row);
    }
  });
});

// Create a new user
router.post('/', (req, res) => {
  const newUser = req.body;
  const sql = `INSERT INTO member (email, name, org_joining_date, project_id, designation, uuid, people_manager_id, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [newUser.email, newUser.name, newUser.org_joining_date, newUser.project_id, newUser.designation, newUser.uuid, newUser.people_manager_id, newUser.is_admin];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).send(`Error creating member: \${err.message}`);
    } else {
      res.status(201).send(`Member added with ID: \${this.lastID}`);
    }
  });
});

// Update a member
router.put('/:uuid', (req, res) => {
  const uuid = req.params.uuid;
  const updatedUser = req.body;
  const sql = `UPDATE member SET email = ?, name = ?, org_joining_date = ?, project_id = ?, designation = ?, uuid = ?, people_manager_id = ?, is_admin = ? WHERE uuid = ?`;
  const params = [updatedUser.email, updatedUser.name, updatedUser.org_joining_date, updatedUser.project_id, updatedUser.designation, updatedUser.uuid, updatedUser.people_manager_id, updatedUser.is_admin, uuid];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).send(`Error updating member: \${err.message}`);
    } else if (this.changes === 0) {
      res.status(404).send(`Member with ID \${userId} not found.`);
    } else {
      res.send(`Member with ID \${userId} updated.`);
    }
  });
});

// Delete a user
router.delete('/:uuid', (req, res) => {
  const uuid = req.params.uuid;
  
  db.run(`DELETE FROM member WHERE uuid = ?`, [uuid], function(err) {
    if (err) {
      res.status(500).send(`Error deleting member: \${err.message}`);
    } else if (this.changes === 0) {
      res.status(404).send(`Member with uuid \${uuid} not found.`);
    } else {
      res.send(`Member with uuid \${uuid} deleted.`);
    }
  });
});

// Export the router
module.exports = router;