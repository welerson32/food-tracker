import { PersonRepo } from './../Repository/person.repository';

export class PersonService {
    
    private personRepo : PersonRepo;

    constructor(){
        this.personRepo = new PersonRepo();
    }

    async insert(obj: any): Promise<any>{
        obj = await this.personRepo.insert(obj);
        return obj;
    }
}
