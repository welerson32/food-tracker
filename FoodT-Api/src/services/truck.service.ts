import { TruckRepo } from '../Repository/truck.repository';
import { Truck } from '../../../Library/Entities/Truck';

export class TruckService {

    private truckRepo: TruckRepo;

    constructor() {
        this.truckRepo = new TruckRepo();
    }

    async get() {
        return await this.truckRepo.getTrucks();
    }

    async count(obj: any) {
        obj = await this.truckRepo.countTrucks(obj);
        return obj;
    }

}
