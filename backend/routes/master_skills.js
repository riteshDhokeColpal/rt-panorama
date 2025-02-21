// skills.js
const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Import the database connection

// Get all skills
router.get('/', (req, res) => {
  db.all(`SELECT * FROM master_skills`, (err, rows) => {
    if (err) {
      res.status(500).send(`Error retrieving skills: \${err.message}`);
    } else {
      res.json(rows);
    }
  });
});

// Get a single skill by UUID
router.get('/:uuid', (req, res) => {
  const skillUuid = req.params.uuid;
  db.get(`SELECT * FROM skill WHERE uuid = ?`, [skillUuid], (err, row) => {
    if (err) {
      res.status(500).send(`Error retrieving skill: \${err.message}`);
    } else if (!row) {
      res.status(404).send(`Skill with UUID \${skillUuid} not found.`);
    } else {
      res.json(row);
    }
  });
});

// Create a new skill
router.post('/', (req, res) => {
  const newSkill = req.body;
  const sql = `INSERT INTO skill (uuid, skillset) VALUES (?, ?)`;
  const params = [newSkill.uuid, newSkill.skillset];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).send(`Error creating skill: \${err.message}`);
    } else {
      res.status(201).send(`Skill added with UUID: \${newSkill.uuid}`);
    }
  });
});

// Update a skill
router.put('/:uuid', (req, res) => {
  const skillUuid = req.params.uuid;
  const updatedSkill = req.body;
  const sql = `UPDATE skill SET skillset = ? WHERE uuid = ?`;
  const params = [updatedSkill.skillset, skillUuid];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).send(`Error updating skill: \${err.message}`);
    } else if (this.changes === 0) {
      res.status(404).send(`Skill with UUID \${skillUuid} not found.`);
    } else {
      res.send(`Skill with UUID \${skillUuid} updated.`);
    }
  });
});

// Delete a skill
router.delete('/:uuid', (req, res) => {
  const skillUuid = req.params.uuid;
  
  db.run(`DELETE FROM skill WHERE uuid = ?`, [skillUuid], function(err) {
    if (err) {
      res.status(500).send(`Error deleting skill: \${err.message}`);
    } else if (this.changes === 0) {
      res.status(404).send(`Skill with UUID \${skillUuid} not found.`);
    } else {
      res.send(`Skill with UUID \${skillUuid} deleted.`);
    }
  });
});

router.get('/members-by-skill/:uuid', (req, res) => {
  const skillUuid = req.params.uuid;

  // SQL query to find members with the given skillset UUID
  const sql = `
    SELECT m.id, m.name,m.uuid as member_uuid,s.uuid as skill_uui
    FROM member AS m
    JOIN member_skills AS ms ON m.id = ms.member_id
    JOIN master_skills AS s ON ms.skillset_id = s.id
    WHERE s.uuid = ?
  `;

  db.all(sql, [skillUuid], (err, rows) => {
    if (err) {
      res.status(500).send(`Error retrieving members: ${err.message}`);
    } else {
      res.json(rows);
    }
  });
});

// Export the router
module.exports = router;