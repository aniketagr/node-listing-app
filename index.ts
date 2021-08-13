import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import PostComponent from './components/postComponent';
import { editPostInterface } from './components/postComponentInterface';

const app = express();
const port = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test', function (req, res) {
    res.send("Test Endpoint Working !!!!");
});

app.get('/listPosts', async function (req, res) {
    try {
        const controller = new PostComponent();
        await controller.postListing()
            .then(response => {
                console.log(`Listing all posts response is ${JSON.stringify(response)}`);
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(400).send({ message: 'Something went wrong!' });
            });
    } catch (err) {
        console.error(err);
        res.end(err);
    }
});

app.get('/editPost/:id', async function (req, res) {
    try {
        const id: string = req.params.id;

        const controller = new PostComponent();
        await controller.editPost(id)
            .then(response => {
                console.log(`Fetch post response is ${JSON.stringify(response)}`);
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(400).send({ message: 'Something went wrong while fetching a post!' });
            });
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: err });
    }
});

app.put('/updatePost/:id', async function (req, res) {
    try {
        const id: string = req.params.id;
        const body: editPostInterface = req.body;
        if (Object.keys(body).length === 0) throw new Error('Request body is empty');

        const controller = new PostComponent();
        await controller.updatePost(id, body)
            .then(response => {
                console.log(`Update post response is ${JSON.stringify(response)}`);
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(400).send({ message: 'Something went wrong!' });
            });
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: err });
    }
});

app.listen(port, function () {
    console.log(`Listing app listening on port ${port}`);
});