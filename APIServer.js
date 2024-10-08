const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let courses = [];

app.post('/courses', (req, res) => {
    const { title, description, duration } = req.body;
    const newCourse = { id: courses.length + 1, title, description, duration };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.put('/courses/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, duration } = req.body;
    const course = courses.find(c => c.id === parseInt(id));

    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.duration = duration || course.duration;
    res.json(course);
});

app.delete('/courses/:id', (req, res) => {
    const { id } = req.params;
    const courseIndex = courses.findIndex(c => c.id === parseInt(id));

    if (courseIndex === -1) {
        return res.status(404).json({ message: 'Course not found' });
    }

    courses.splice(courseIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});