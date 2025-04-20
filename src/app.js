import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import eventRouts from './routes/router.js';


// Inisialisasi app
const app = express();



// Middleware
app.use(cors());
app.use(bodyParser.json());

// Gunakan routes
app.use('/event', eventRouts);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// probalitasPrior();
// likelihood();
// probalitasPostrior();
// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});