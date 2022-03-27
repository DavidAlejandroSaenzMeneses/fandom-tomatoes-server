import mongoose from 'mongoose';

class ConnectionDB {
    mongoUrlLocal = 'mongodb://127.0.0.1:27017/famdom-tomatoes-database';
    //mongoose.set('useNewUrlParser', true);
    connect(){
        mongoose.connect(process.env.MONGODB_URI || this.mongoUrlLocal)
            .then(() => console.log('DB conected'))
            .catch(err => console.log(err));
    }
}

export const database = new ConnectionDB();