import { BaseMongoRepo } from './infrastructure/base.mongo.repo';

const collectionName = "truck"

export class TruckRepo extends BaseMongoRepo {

    constructor() {
        super(collectionName);
    }

    async register(obj: any) {
        obj = await super.insertOne(obj);
        return obj;
    }

    async update(obj: any) {
        obj = await super.update(obj);
        return obj;
    }

}
