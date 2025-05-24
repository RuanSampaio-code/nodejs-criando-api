import mongoose, { mongo } from 'mongoose';


async function conectaDatBase() {
    mongoose.connect(process.env.DB_CONNECTION_STRING);
    return mongoose.connection;
}

export default conectaDatBase;


//mongodb+srv://admin:<db_password>@cluster0.zeiavrx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0