const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gv7qy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     console.log('mongodb connected')
//     client.close();
// });


async function run() {
    try {
        await client.connect();

        const partsCollection = client.db('XtremeTech').collection('Parts');
        const clientPartsCollection = client.db('XtremeTech').collection('Clientparts');
        app.get('/part', async (req, res) => {
            const query = {};
            const cursor = partsCollection.find(query);
            const parts = await cursor.toArray();
            res.send(parts);
        })

        app.get('/part/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const part = await partsCollection.findOne(query);
            res.send(part);
        })

        // Client Section
        app.post('/clientparts', async (req, res) => {
            const clientParts = req.body;
            const result = await clientPartsCollection.insertOne(clientParts);
            res.send(result)
        })

        // Client Products
        app.get('/clientparts/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            // const query = {};
            const cursor = clientPartsCollection.find(query);
            const parts = await cursor.toArray();
            res.send(parts);
        })

        app.delete('/clientparts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await clientPartsCollection.deleteOne(query);

            res.send(result);


        })


        app.get('/clientpart/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const part = await clientPartsCollection.findOne(query);
            res.send(part);
        })

    }

    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running Pc parts manufacturer server')
})

app.listen(port, () => {
    console.log('Listening to port', port)
})