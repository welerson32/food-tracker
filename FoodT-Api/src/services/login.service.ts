import { PersonRepo } from '../Repository/person.repository';
import { TruckRepo } from '../Repository/truck.repository';
import { Person } from '../../../Library/Entities/Person';
import { Truck } from '../../../Library/Entities/Truck';

export class LoginService {

    private personRepo: PersonRepo;
    private truckRepo: TruckRepo;

    constructor() {
        this.personRepo = new PersonRepo();
        this.truckRepo = new TruckRepo();
    }

    async loginPerson(obj: any): Promise<Person> {
        obj = await this.personRepo.login(obj);
        return obj;
    }

    async loginTruck(obj: any): Promise<Truck> {
        obj = await this.truckRepo.login(obj);
        return obj;
    }

}
