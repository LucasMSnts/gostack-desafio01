const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?teste=1
// Route params = /projects/1
// Request body = { id: "1", title: "Novo projeto", tasks: ["Nova tarefa"] }

const projects = [];
let countReq = 0;

// Middleware global de contagem de quantas requisições foram feitas
server.use((req, res, next) => {
    countReq += 1;
    console.log(`Number of requests: ${countReq}`);

    return next();
});

// Middleware que verifica se o projeto existe
function checkIdProject(req, res, next) {
    const { id } = req.params;
    const project = projects.find(proj => proj.id == id);

    if (!project) {
        return res.status(400).json({ error: 'Project not found' });
    }

    return next();
}

// Rotas
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

server.put('/projects/:id', checkIdProject, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(proj => proj.id == id);

    project.title =  title ;

    return res.json(project);
});

server.delete('/projects/:id', checkIdProject, (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(proj => proj.id == id);

    projects.splice(projectIndex, 1);

    return res.send();
});


server.post('/projects/:id/tasks', checkIdProject, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(proj => proj.id == id);
    
    project.tasks.push(title);

    return res.json(project);
});

server.listen(3000);