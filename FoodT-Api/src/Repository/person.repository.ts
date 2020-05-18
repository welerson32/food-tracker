import { BaseMongoRepo } from './infrastructure/base.mongo.repo';
import { Person } from '../../../Library/Entities/Person';

const collectionName = "person"

export class PersonRepo extends BaseMongoRepo {

    constructor() {
        super(collectionName);
    }

    async login(obj: any): Promise<Person> {
        obj = await super.login(obj);
        return obj;
    }

    async register(obj: any): Promise<Person> {
        obj = await super.insertOne(obj);
        return obj;
    }

    async update(obj: any) {
        obj = await super.update(obj, false);
        return obj;
    }

}
