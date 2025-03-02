const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Import the database connection

// Read (Get) an assist by member UUID
router.get('/:uuid', (req, res) => {
    const assistUuid = req.params.uuid;
    db.all(`SELECT * FROM assists WHERE member_uuid = ?`, [assistUuid], (err, row) => {
        if (err) {
            res.status(500).send(`Error retrieving assist: ${err.message}`);
        } else if (!row) {
            res.status(404).send(`Assist with member UUID ${assistUuid} not found.`);
        } else {
            res.json(row);
        }
    });
});

// Create a new assist
router.post('/', (req, res) => {
    const { member_uuid, assisted_to_uuid, description, date_assist,topic } = req.body;
    console.log(req.body);
    db.run(`INSERT INTO assists (member_uuid, assisted_to_uuid, description, date_assist,topic) VALUES (?, ?, ?, ?,?)`, 
    [member_uuid, assisted_to_uuid, description, date_assist,topic], 
    function (err) {
        if (err) {
            res.status(500).send(`Error creating assist: ${err.message}`);
        } else {
            res.status(201).json({ id: this.lastID, member_uuid, assisted_to_uuid, description, date_assist });
        }
    });
});

// Update an assist
router.put('/:id', (req, res) => {
    const assistId = req.params.id;
    const { member_uuid, assisted_to_uuid, description, date_assist } = req.body;
    db.run(`UPDATE assists SET member_uuid = ?, assisted_to_uuid = ?, description = ?, date_assist = ? WHERE id = ?`, 
    [member_uuid, assisted_to_uuid, description, date_assist, assistId], 
    function (err) {
        if (err) {
            res.status(500).send(`Error updating assist: \${err.message}`);
        } else if (this.changes === 0) {
            res.status(404).send(`Assist with ID \${assistId} not found.`);
        } else {
            res.json({ id: assistId, member_uuid, assisted_to_uuid, description, date_assist });
        }
    });
});

// Delete an assist
router.delete('/:id', (req, res) => {
    const assistId = req.params.id;
    db.run(`DELETE FROM assists WHERE id = ?`, [assistId], function (err) {
        if (err) {
            res.status(500).send(`Error deleting assist: \${err.message}`);
        } else if (this.changes === 0) {
            res.status(404).send(`Assist with ID \${assistId} not found.`);
        } else {
            res.status(204).send(); // No content on successful deletion
        }
    });
});

module.exports = router;