const db = require('../db'); // Import the database connection
const members = require('./members.json')
const projects = require('./projects.json')
const masterSkills = require('./master_skillsets.json')
const memberSkills = require('./member_skillsets.json')
const memberProjects =  require('./project_members.json')
const assistsData =  require('./assists.json')

function createMemberTableWithSampleData() {
    db.serialize(() => {
        // Check if the 'member' table exists
        db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='member';`, (err, row) => {
            if (err) {
                console.error('Error fetching table information: ', err);
                return;
            }

            if (!row) {
                console.log("Table 'member' does not exist, creating table...");

                // Create the 'member' table
                db.run(`CREATE TABLE member (
                    id INTEGER PRIMARY KEY,
                    email TEXT NOT NULL,
                    name TEXT NOT NULL,
                    org_joining_date TEXT NOT NULL,
                    project_id TEXT NOT NULL,
                    designation TEXT NOT NULL,
                    uuid TEXT NOT NULL,
                    people_manager_id TEXT,
                    location TEXT,
                    member_status TEXT,
                    is_admin BOOLEAN NOT NULL
                );`, (createErr) => {
                    if (createErr) {
                        console.error('Error creating table: ', createErr);
                    } else {
                        console.log("Table 'member' created successfully.");

                        // Insert sample entries
                        const insertStmt = db.prepare(`INSERT INTO member (id, email, name, org_joining_date, project_id, designation, uuid, people_manager_id,location,member_status, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`);

                        members.forEach(member => {
                            insertStmt.run([
                                member.id,
                                member.email,
                                member.name,
                                member.org_joining_date,
                                member.project_id,
                                member.designation,
                                member.uuid,
                                member.people_manager_id,
                                member.location,
                                member.member_status,
                                member.is_admin
                            ]);
                        });

                        insertStmt.finalize();
                        console.log("Sample entries added to 'member' table.");
                    }
                });
            } else {
                console.log("Table 'member' already exists, no operations needed.");
            }
        });
    });
}


function createProjectTableWithSampleData() {
    db.serialize(() => {
        db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='project';`, (err, row) => {
            if (!row) {
                db.run(`CREATE TABLE project (
                    id INTEGER PRIMARY KEY,
                    name TEXT NOT NULL,
                    project_desc TEXT NOT NULL,
                    business_unit TEXT NOT NULL,
                    start_date INTEGER NOT NULL,
                    end_date INTEGER NOT NULL,
                    github_repo_url TEXT NOT NULL,
                    uuid TEXT NOT NULL,
                    date_added INTEGER NOT NULL,
                    last_updated INTEGER NOT NULL
                );`, () => {
                    const insertStmt = db.prepare(`INSERT INTO project (id, name, project_desc, business_unit, start_date, end_date, github_repo_url, uuid, date_added, last_updated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
                    projects.forEach(project => {
                        insertStmt.run([
                            project.id,
                            project.name,
                            project.project_desc,
                            project.business_unit,
                            project.start_date,
                            project.end_date,
                            project.github_repo_url,
                            project.uuid,
                            project.date_added,
                            project.last_updated
                        ]);
                    });
                    insertStmt.finalize();
                });
            }
        });
    });
}



function createMasterSkillsTableWithSampleData() {

    db.serialize(() => {
        db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='master_skills';`, (err, row) => {
            if (!row) {
                db.run(`CREATE TABLE master_skills (
                    id INTEGER PRIMARY KEY,
                    uuid TEXT NOT NULL,
                    name TEXT NOT NULL
                );`, () => {
                    const insertStmt = db.prepare(`INSERT INTO master_skills (id, uuid, name) VALUES (?, ?, ?)`);
                    masterSkills.forEach(skill => {
                        insertStmt.run([
                            skill.id,
                            skill.uuid,
                            skill.skillset
                        ]);
                    });
                    insertStmt.finalize();
                });
            }
        });
    });
}

function createMemberSkillsTableWithSampleData() {

    db.serialize(() => {
        db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='member_skills';`, (err, row) => {
            if (!row) {
                db.run(`CREATE TABLE member_skills (
                    id INTEGER PRIMARY KEY,
                    member_id INTEGER NOT NULL,
                    skillset_id INTEGER NOT NULL
                );`, () => {
                    const insertStmt = db.prepare(`INSERT INTO member_skills (id, member_id, skillset_id) VALUES (?, ?, ?)`);
                    memberSkills.forEach(ms => {
                        insertStmt.run([
                            ms.id,
                            ms.member_id,
                            ms.skillset_id
                        ]);
                    });
                    insertStmt.finalize();
                });
            }
        });
    });
}


function createMemberProjectsTableWithSampleData() {
    // Sample data for member_projects

    db.serialize(() => {
        db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='member_projects';`, (err, row) => {
            if (!row) {
                db.run(`CREATE TABLE member_projects (
                    id INTEGER PRIMARY KEY,
                    project_uuid TEXT NOT NULL,
                    user_uuid TEXT NOT NULL,
                    designation TEXT NOT NULL,
                    start_date INTEGER NOT NULL,
                    end_date INTEGER NOT NULL
                );`, () => {
                    const insertStmt = db.prepare(`INSERT INTO member_projects (id, project_uuid, user_uuid, designation, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)`);
                    memberProjects.forEach(mp => {
                        insertStmt.run([
                            mp.id,
                            mp.project_uuid,
                            mp.user_uuid,
                            mp.designation,
                            mp.start_date,
                            mp.end_date
                        ]);
                    });
                    insertStmt.finalize();
                });
            }
        });
    });
}


function createAssistsTableWithSampleData() {
    db.serialize(() => {
        db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='assists';`, (err, row) => {
            if (!row) {
                // Create the table with an additional 'topic' column
                db.run(`CREATE TABLE assists (
                    id INTEGER PRIMARY KEY,
                    member_uuid TEXT NOT NULL,
                    assisted_to_uuid TEXT NOT NULL,
                    description TEXT NOT NULL,
                    date_assist INTEGER NOT NULL,
                    topic TEXT NOT NULL  -- Added topic column
                );`, () => {
                    const insertStmt = db.prepare(`INSERT INTO assists (id, member_uuid, assisted_to_uuid, description, date_assist, topic) VALUES (?, ?, ?, ?, ?, ?)`);

                    // Add sample data, including the topic
                    assistsData.forEach(assist => {
                        insertStmt.run([
                            assist.id,
                            assist.member_uuid,
                            assist.assisted_to_uuid,
                            assist.description,
                            assist.date_assist,
                            assist.topic  // Include topic in the insertion
                        ]);
                    });
                    insertStmt.finalize();
                });
            }
        });
    });
}


module.exports = {
    createMemberTableWithSampleData,
    createProjectTableWithSampleData,
    createMasterSkillsTableWithSampleData,
    createMemberSkillsTableWithSampleData,
    createMemberProjectsTableWithSampleData,
    createAssistsTableWithSampleData
};