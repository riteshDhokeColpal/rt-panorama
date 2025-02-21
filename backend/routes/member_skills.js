const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Assuming SQLite database connection as `db`

// Get member skills by member UUID
// Get member skills by member UUID
router.get('/member/:uuid', (req, res) => {
    const memberUuid = req.params.uuid;

    // First, get the member ID using the UUID
    db.get(`SELECT id FROM member WHERE uuid = ?`, [memberUuid], (err, memberRow) => {
        if (err) {
            return res.status(500).send(`Error retrieving member: \${err.message}`);
        }
        if (!memberRow) {
            return res.status(404).send(`Member with UUID \${memberUuid} not found.`);
        }

        const memberId = memberRow.id;

        // Then, get the member's skills using the member ID, including the UUID
        db.all(
            `SELECT msks.uuid, msks.name 
             FROM member_skills ms 
             JOIN master_skills msks ON ms.skillset_id = msks.id 
             WHERE ms.member_id = ?`, 
            [memberId], 
            (err, skillRows) => {
                if (err) {
                    return res.status(500).send(`Error retrieving skills: \${err.message}`);
                }

                // Map over the skills to include both uuid and name
                const skills = skillRows.map(row => ({
                    uuid: row.uuid,
                    name: row.name,
                }));

                res.json(skills);
            }
        );
    });
});

module.exports = router;