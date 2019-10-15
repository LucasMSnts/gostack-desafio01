const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?teste=1
// Route params = /projects/1
// Request body = { id: "1", title: "Novo projeto", tasks: ["Nova tarefa"] }

const projects = [];

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const project = {
        id,
        title,
        tasks: []
    };

    projects.push(project);

    return res.json(project);
});

server.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    projects[id].title =  title ;

    return res.json(projects[id]);
});

server.delete('/projects/:id', (req, res) => {
    const { id } = req.params;

    projects.splice(id, 1);

    return res.send();
});


server.post('/projects/:id/tasks', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    projects[id].tasks.push(title);

    return res.json(projects[id]);
});

server.listen(3000);