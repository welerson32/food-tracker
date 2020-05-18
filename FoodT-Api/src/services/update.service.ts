import { PersonRepo } from '../Repository/person.repository';
import { TruckRepo } from '../Repository/truck.repository';
import { Person } from '../../../Library/Entities/Person';
import { Truck } from '../../../Library/Entities/Truck';

export class UpdateService {

    private personRepo: PersonRepo;
    private truckRepo: TruckRepo;

    constructor() {
        this.personRepo = new PersonRepo();
        this.truckRepo = new TruckRepo();
    }

    async updatePerson(obj: any): Promise<Person> {
        obj = await this.personRepo.update(obj);
        return obj;
    }

    async updateTruck(obj: any): Promise<Truck> {
        obj = await this.truckRepo.update(obj);
        return obj;
    }

}
