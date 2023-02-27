import mongoose, { Connection } from 'mongoose';

export default class MongoDB{
    private connection: Connection | null = null;


    async connect(uri: string): Promise<void> {
        try {
            mongoose.set("strictQuery", false);
            await mongoose.connect(uri);
            this.connection = mongoose.connection;

            console.log('Connected to MongoDB!');
        } catch (err) {
            console.error('Failed to connect to MongoDB:', err);
            throw err;
        }
    }
    getConnection(): Connection {
        if (this.connection) {
            return this.connection;
        } else {
            throw new Error('You must connect to MongoDB before calling this method!');
        }
    }
    async disconnect(): Promise<void> {
        if (this.connection) {
            await this.connection.close();
            this.connection = null;
            console.log('Disconnected from MongoDB!');
        }
    }
}