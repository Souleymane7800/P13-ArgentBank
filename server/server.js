import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { load } from 'js-yaml';
import fs from 'fs';
import dbConnection from './database/connection.js';
import userRoutes from './routes/userRoutes.js';
import process from 'process';

dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Load swagger document
// const swaggerDocument = load(fs.readFileSync('./server/swagger.yaml', 'utf8'));
const swaggerDocument = load(fs.readFileSync('./server/swagger.yaml', 'utf8'));

// Handle potential errors
if (swaggerDocument === null) {
  console.error('Error loading Swagger document');
  // Implement appropriate error handling or fallback
}
// Connect to the database
dbConnection();

// Handle CORS issues
app.use(cors());

// Request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle custom routes
app.use('/api/v1/user', userRoutes);

// API Documentation
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.get('/', (req, res) => {
  res.send('Hello from my Express server v2!');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

