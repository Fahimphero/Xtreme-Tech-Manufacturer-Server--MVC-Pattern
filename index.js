const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dbConnect = require('./utilities/dbConnect');
const partRoutes = require('./routes/v1/part.route');
const viewCount = require('./middleware/viewCount');
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



// middleware
app.use(cors());
app.use(express.json());


// app.use(viewCount);


// Apply the rate limiting middleware to all requests
// app.use(limiter)



dbConnect();

app.use('/api/v1/part', partRoutes);


function verifyJWT(req, res, next) {
    console.log('abc')
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader) {
        return res.status(401).send({ message: 'UnAuthorized access' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' })
        }
        req.decoded = decoded;
        console.log(req.decoded)
        next();
    });


}



async function run() {
    try {
        // await client.connect();

        // const partsCollection = client.db('XtremeTech').collection('Parts');
        // const clientPartsCollection = client.db('XtremeTech').collection('Clientparts');
        // const paymentCollection = client.db('XtremeTech').collection('Payments');
        // const reviewsCollection = client.db('XtremeTech').collection('Reviews');
        // const usersCollection = client.db('XtremeTech').collection('Users');

        // app.get('/part', async (req, res) => {
        //     const query = {};
        //     const cursor = partsCollection.find(query);
        //     const parts = await cursor.toArray();
        //     res.send(parts);
        // })

        // app.get('/part/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const part = await partsCollection.findOne(query);
        //     res.send(part);
        // })

        // app.post('/create-payment-intent', async (req, res) => {
        //     const service = req.body;
        //     const price = service.price;
        //     const amount = price * 100;
        //     const paymentIntent = await stripe.paymentIntents.create({
        //         amount: amount,
        //         currency: 'usd',
        //         payment_method_types: ['card']
        //     });
        //     res.send({ clientSecret: paymentIntent.client_secret })
        // });



        // // Client Section
        // app.post('/clientparts', async (req, res) => {
        //     const clientParts = req.body;
        //     const result = await clientPartsCollection.insertOne(clientParts);
        //     res.send(result)
        // })

        // // Client Products
        // app.get('/clientparts/:email', verifyJWT, async (req, res) => {
        //     const email = req.params.email;
        //     const decodedEmail = req.decoded.email;
        //     if (email === decodedEmail) {
        //         const query = { email: email };
        //         // const query = {};
        //         const cursor = clientPartsCollection.find(query);
        //         const parts = await cursor.toArray();
        //         return res.send(parts);
        //     }
        //     else {
        //         return res.status(403).send({ message: 'Forbidden Access' })
        //     }
        // })

        // app.patch('/clientparts/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const payment = req.body;
        //     const filter = { _id: ObjectId(id) };
        //     const updatedDoc = {
        //         $set: {
        //             paid: true,
        //             transactionId: payment.transactionId
        //         }
        //     }

        //     const result = await paymentCollection.insertOne(payment);
        //     const updatedBooking = await clientPartsCollection.updateOne(filter, updatedDoc);
        //     res.send(updatedBooking);
        // })

        // app.delete('/clientparts/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await clientPartsCollection.deleteOne(query);

        //     res.send(result);


        // })


        // app.get('/clientpart/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const part = await clientPartsCollection.findOne(query);
        //     res.send(part);
        // })

        // // Client Reviews
        // app.post('/clientreviews', async (req, res) => {
        //     const clientReviews = req.body;
        //     const result = await reviewsCollection.insertOne(clientReviews);
        //     res.send(result)
        // })
        // app.get('/clientreviews', async (req, res) => {
        //     const query = {};
        //     const cursor = reviewsCollection.find(query);
        //     const reviews = await cursor.toArray();
        //     res.send(reviews);
        // })




        // // User Profile update or insert
        // app.put('/userinfo/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const update = req.body;
        //     const filter = { email: email };
        //     const options = { upsert: true };
        //     const updatedDoc = {
        //         $set: {
        //             userName: update.user,
        //             email: update.email,
        //             education: update.education,
        //             location: update.location,
        //             phoneNumber: update.phoneNumber,
        //             linkedinProfile: update.linkedin,
        //             role: update.role
        //         }
        //     };
        //     const result = await usersCollection.updateOne(filter, updatedDoc, options);
        //     res.send(result);

        // })


        // app.put('/userbasicinfo/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const update = req.body;
        //     const filter = { email: email };
        //     const options = { upsert: true };
        //     const updatedDoc = {
        //         $set: {
        //             userName: update.user,
        //             email: update.email,

        //         }
        //     };
        //     const result = await usersCollection.updateOne(filter, updatedDoc, options);
        //     const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        //     res.send({ result, token });

        // })


        // app.get('/users', verifyJWT, async (req, res) => {
        //     const query = {};
        //     const cursor = usersCollection.find(query);
        //     const users = await cursor.toArray();
        //     res.send(users);
        // })

        // app.get('/admin/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const user = await usersCollection.findOne({ email: email })
        //     const isAdmin = user.role === 'admin'
        //     res.send({ admin: isAdmin })
        // })


        // // Make Admin
        // app.put('/userinfo/admin/:email', verifyJWT, async (req, res) => {
        //     const email = req.params.email;
        //     const requester = req.decoded.email;
        //     const requesterAccount = await usersCollection.findOne({ email: requester })
        //     if (requesterAccount.role === 'admin') {
        //         const filter = { email: email };
        //         const updatedDoc = {
        //             $set: {
        //                 role: 'admin'
        //             }
        //         };
        //         const result = await usersCollection.updateOne(filter, updatedDoc);
        //         res.send(result);
        //     }
        //     else {
        //         res.status(403).send({ message: 'forbidden' })
        //     }

        // })

        // // Delete User
        // app.delete('/users/:id', verifyJWT, async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await usersCollection.deleteOne(query);
        //     res.send(result);
        // })


    }

    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running Pc parts manufacturer server')
})


app.all("*", (req, res) => {
    res.send('No Route Found')
})

app.listen(port, () => {
    console.log('Listening to port', port)
})