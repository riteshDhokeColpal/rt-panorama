const express = require('express')
const app = express()
const cors = require('cors');
const membersRoutes = require('./routes/members');
const projectRoutes = require('./routes/projects');
const memberSkillsRoute = require('./routes/member_skills');
const masterSkillsRoute = require('./routes/master_skills');
const assistsRoute = require('./routes/assists');

app.use(express.json());


const db = require('./db/db');
app.use(cors());

// sample data
const { createMemberTableWithSampleData, createProjectTableWithSampleData, createMasterSkillsTableWithSampleData,createMemberProjectsTableWithSampleData, createMemberSkillsTableWithSampleData,createAssistsTableWithSampleData} = require('./db/sample_data/members');
createMemberTableWithSampleData()
createProjectTableWithSampleData()
createMasterSkillsTableWithSampleData()
createMemberProjectsTableWithSampleData()
createMemberSkillsTableWithSampleData()
createAssistsTableWithSampleData()

app.use('/users', membersRoutes);
app.use('/project', projectRoutes);
app.use('/member-skills', memberSkillsRoute);
app.use('/master-skills', masterSkillsRoute);
app.use('/assists', assistsRoute);

app.listen(3008, () => {
    console.log(`app listening on port 3008`)
  })