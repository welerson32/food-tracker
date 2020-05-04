import { PersonRepo } from '../Repository/person.repository';
import { TruckRepo } from '../Repository/truck.repository'

export class RegisterService {

    private personRepo: PersonRepo;
    private truckRepo: TruckRepo;

    constructor() {
        this.personRepo = new PersonRepo();
        this.truckRepo = new TruckRepo();
    }

    async insertPerson(obj: any): Promise<any> {
        obj = await this.personRepo.register(obj);
        return obj;
    }

    async insertTruck(obj: any): Promise<any> {
        obj = await this.truckRepo.register(obj);
        return obj;
    }

}
