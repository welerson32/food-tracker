import { BaseMongoRepo } from './infrastructure/base.mongo.repo';

const collectionName = "person"

export class PersonRepo extends BaseMongoRepo {

    constructor() {
        super(collectionName);
    }

    async login(obj: any) {
        obj = await super.login(obj);
        return obj;
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
