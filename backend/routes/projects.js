const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Import the database connection

// Get all projects
router.get('/', (req, res) => {
  db.all(`SELECT * FROM project`, (err, rows) => {
    if (err) {
      res.status(500).send(`Error retrieving projects: \${err.message}`);
    } else {
      res.json(rows);
    }
  });
});

// Get a single project by UUID
router.get('/:uuid', (req, res) => {
  const projectUuid = req.params.uuid;
  db.get(`SELECT * FROM project WHERE uuid = ?`, [projectUuid], (err, row) => {
    if (err) {
      res.status(500).send(`Error retrieving project: \${err.message}`);
    } else if (!row) {
      res.status(404).send(`Project with UUID \${projectUuid} not found.`);
    } else {
      res.json(row);
    }
  });
});

// Create a new project
router.post('/', (req, res) => {
  const newProject = req.body;
  const sql = `INSERT INTO project (name, project_desc, business_unit, start_date, end_date, github_repo_url, uuid, date_added, last_updated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    newProject.name, 
    newProject.project_desc, 
    newProject.business_unit, 
    newProject.start_date, 
    newProject.end_date, 
    newProject.github_repo_url, 
    newProject.uuid, 
    newProject.date_added, 
    newProject.last_updated
  ];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).send(`Error creating project: \${err.message}`);
    } else {
      res.status(201).send(`Project added with UUID: \${newProject.uuid}`);
    }
  });
});

// Update a project
router.put('/:uuid', (req, res) => {
  const projectUuid = req.params.uuid;
  const updatedProject = req.body;
  const sql = `UPDATE project SET name = ?, project_desc = ?, business_unit = ?, start_date = ?, end_date = ?, github_repo_url = ?, date_added = ?, last_updated = ? WHERE uuid = ?`;
  const params = [
    updatedProject.name, 
    updatedProject.project_desc, 
    updatedProject.business_unit, 
    updatedProject.start_date, 
    updatedProject.end_date, 
    updatedProject.github_repo_url, 
    updatedProject.date_added, 
    updatedProject.last_updated, 
    projectUuid
  ];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).send(`Error updating project: \${err.message}`);
    } else if (this.changes === 0) {
      res.status(404).send(`Project with UUID \${projectUuid} not found.`);
    } else {
      res.send(`Project with UUID \${projectUuid} updated.`);
    }
  });
});

// Delete a project
router.delete('/:uuid', (req, res) => {
  const projectUuid = req.params.uuid;
  
  db.run(`DELETE FROM project WHERE uuid = ?`, [projectUuid], function(err) {
    if (err) {
      res.status(500).send(`Error deleting project: \${err.message}`);
    } else if (this.changes === 0) {
      res.status(404).send(`Project with UUID \${projectUuid} not found.`);
    } else {
      res.send(`Project with UUID \${projectUuid} deleted.`);
    }
  });
});



router.get('/project_members/:uuid', (req, res) => {
  const projectUuid = req.params.uuid;

  // Get project details
  db.get(`SELECT * FROM project WHERE uuid = ?`, [projectUuid], (err, projectRow) => {
    if (err) {
      return res.status(500).send(`Error retrieving project: ${err.message}`);
    } 

    if (!projectRow) {
      return res.status(404).send(`Project with UUID ${projectUuid} not found.`);
    }

    // Get members associated with this project
    db.all(`SELECT m.* FROM member m 
            JOIN member_projects mp ON m.uuid = mp.user_uuid 
            WHERE mp.project_uuid = ?`, [projectUuid], (err, memberRows) => {
      if (err) {
        return res.status(500).send(`Error retrieving members: ${err.message}`);
      }

      // Get skills for each member
      const memberIds = memberRows.map(member => member.id);
      if (memberIds.length > 0) {
        db.all(
          `SELECT ms.member_id, mk.name 
           FROM member_skills ms 
           JOIN master_skills mk ON ms.skillset_id = mk.id 
           WHERE ms.member_id IN (${memberIds.join(',')})`,
          (err, skillsRows) => {
            if (err) {
              return res.status(500).send(`Error retrieving skills: ${err.message}`);
            }

            // Add skills to respective members
            const memberSkillsMap = memberRows.map(member => {
              const skills = skillsRows
                .filter(skill => skill.member_id === member.id)
                .map(skill => skill.name);

              return {
                ...member,
                skills,
              };
            });

            // Send combined project and member data
            const projectInfo = {
              project: projectRow,
              members: memberSkillsMap,
            };

            res.json(projectInfo);
          }
        );
      } else {
        // No members found, return project info with an empty members array
        const projectInfo = {
          project: projectRow,
          members: [],
        };
        res.json(projectInfo);
      }
    });
  });
});
// Get all projects for a specific member by their UUID
// Get all projects for a specific member by their UUID
router.get('/member_projects/:uuid', (req, res) => {
  const memberUuid = req.params.uuid;

  // Assumes the existence of tables 'project' and 'member_projects' with correct relationships
  // member_projects table should have columns for 'user_uuid' and 'project_uuid'.
  db.all(`SELECT p.* FROM project p
          INNER JOIN member_projects mp ON p.uuid = mp.project_uuid 
          WHERE mp.user_uuid = ?`, [memberUuid], (err, projectRows) => {
    if (err) {
      return res.status(500).send(`Error retrieving projects for member: \${err.message}`);
    }

    if (projectRows.length === 0) {
      return res.status(404).send(`No projects found for member with UUID \${memberUuid}.`);
    }

    // Send back all projects related to the member
    res.json(projectRows);
  });
});
// Export the router
module.exports = router;