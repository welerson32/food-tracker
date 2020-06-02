import { Db, MongoClient, MongoClientOptions, ObjectID } from 'mongodb';

export class BaseMongoRepo {

    protected dbName = "FoodTracker";
    private collectionName: string;
    private connUri = `mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
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

    async login(obj: any) {
        let client: MongoClient;
        try {
            const cpf = obj.document;
            client = await this.connect();
            const db = client.db(this.dbName);
            return await db.collection(this.collectionName).findOne({ document: cpf });
        } catch (err) {
            throw err;
        } finally {
            if (client) {
                client.close();
            }
        }
    }

    async getAllTrucks() {
        let client: MongoClient;
        try {
            client = await this.connect();
            const db = client.db(this.dbName);
            return await db.collection(this.collectionName).find({ 'location.city': 'Belo Horizonte', 'open': true }).toArray();
        } catch (err) {
            throw err;
        } finally {
            if (client) {
                client.close();
            }
        }
    }

    async countTrucks(obj: any) {
        let client: MongoClient;
        try {
            const neighborhood = obj.location.neighborhood;
            client = await this.connect();
            const db = client.db(this.dbName);
            let count = 0;
            await db.collection(this.collectionName).find({ 'location.neighborhood': neighborhood, 'open': true }).count()
                .then(function (numItems) {
                    count = numItems - 1;
                });
            return count
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

    async update(obj: any, upsert: boolean = true): Promise<void> {
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
