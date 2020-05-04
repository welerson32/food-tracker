import { Db, MongoClient, MongoClientOptions, ObjectID } from 'mongodb';

export class BaseMongoRepo {

    protected dbName = "food-tracker";
    private collectionName: string;
    private connUri = `mongodb+srv://teste:wfg24002@cluster0-haqrh.gcp.mongodb.net/test?retryWrites=true&w=majority`;
    private connOptions: MongoClientOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 100,
    };

    constructor(collectionName: string) {
        this.collectionName = collectionName;
    }

    connect() {
        return MongoClient.connect(this.connUri, this.connOptions);
    }

    db(client: MongoClient) {
        return client?.db(this.dbName);
    }

    async get(id: string) {
        let client: MongoClient;
        try {
            client = await this.connect();
            const db = client.db(this.dbName);
            return await db.collection(this.collectionName).findOne({ _id: new ObjectID(id) });
        } catch (err) {
            throw err;
        } finally {
            if (client) {
                client.close();
            }
        }
    }

    async insertOne(obj: any) {
        let client: MongoClient;
        try {
            client = await this.connect();
            const db = client.db(this.dbName);
            const insertedData = await db.collection(this.collectionName).insertOne(obj);
        } catch (err) {
            throw err;
        } finally {
            if (client) {
                client.close();
            }
        }
    }

    async insertMany(obj: any) {
        let client: MongoClient;
        try {
            client = await this.connect();
            const db = client.db(this.dbName);
            const insertedData = await db.collection(this.collectionName).insertMany(obj);
        } catch (err) {
            throw err;
        } finally {
            if (client) {
                client.close();
            }
        }
    }

    async update(obj: any, upsert: boolean = true) {
        let client: MongoClient;
        try {
            const id = obj._id;
            delete obj._id;
            client = await this.connect();
            const db = client.db(this.dbName);
            await db.collection(this.collectionName).updateOne({
                _id: new ObjectID(id)
            }, {
                $set: obj
            }, {
                upsert: upsert
            });
        } catch (err) {
            throw err;
        } finally {
            if (client) {
                client.close();
            }
        }
    }

}
