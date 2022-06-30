const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// use custom api routes
app.use('/api', apiRoutes);

// Default response for any other requests (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// initialize the server after connecting to the database
db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})