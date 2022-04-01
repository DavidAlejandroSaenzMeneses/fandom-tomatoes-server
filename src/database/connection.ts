import mongoose from 'mongoose';

class ConnectionDB {
    MONGODB_URL_LOCAL = 'mongodb://127.0.0.1:27017/famdom-tomatoes-database';
    connect(){
        mongoose.connect(process.env.MONGODB_URI || this.MONGODB_URL_LOCAL)
            .then(() => console.log('DB conected'))
            .catch(err => console.log(err));
    }
}

export const database = new ConnectionDB();