import { BaseMongoRepo } from './infrastructure/base.mongo.repo';

const collectionName = "truck"

export class TruckRepo extends BaseMongoRepo {

    constructor() {
        super(collectionName);
    }

    async login(obj: any) {
        obj = await super.login(obj);
        return obj;
    }

    async getTrucks() {
        return await super.getAllTrucks();
    }

    async countTrucks(obj: any) {
        obj = await super.countTrucks(obj);
        return obj;
    }

    async register(obj: any) {
        obj = await super.insertOne(obj);
        return obj;
    }

    async update(obj: any) {
        obj = await super.update(obj, false);
        return obj;
    }

}
