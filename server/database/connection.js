import mongoose from 'mongoose';
import process from 'process';
import dotenv from 'dotenv';

dotenv.config();  // Make sure to load the environment variables

const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/argentBankDB';

export default async function dbConnection() {
    try {
        await mongoose.connect(databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Database connection failed');
        console.error(error);
        process.exit(1);
    }
}


// import mongoose from 'mongoose';
// import process from 'process';

// const databaseUrl =
//   process.env.DATABASE_URL || 'mongodb://localhost/argentBankDB';

//   export default async function dbConnection() {
//       try {
//             await mongoose.connect(databaseUrl, {
//                   useNewUrlParser: true,
//                   // useUnifiedTopology: true,
//             });
//             console.log('Database connected successfully');
//       } catch (error) {
//             console.log('Database connection failed');
//             console.error(error);
//             process.exit(1);
//       }
// }


