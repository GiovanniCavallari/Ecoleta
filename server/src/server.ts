import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    response.json({ ok: 'Hello World' });
})

app.listen(3333);