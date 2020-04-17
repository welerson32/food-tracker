import { BaseMongoRepo } from './infrastructure/base.mongo.repo';

const collectionName = "test_collection"

export class PersonRepo extends BaseMongoRepo {

    constructor() {
        super(collectionName);
    }

    async insert(obj:any){
        obj = await super.insert(obj);
        return obj;
    }

}
