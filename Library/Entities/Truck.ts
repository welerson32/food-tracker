import { TruckMenu } from './TruckMenu';
import { Location } from './location';
import { Rating } from './Rating';
import { TruckSchedules } from './TruckSchedules';
export class Truck {
    _id: any;
    open: boolean;
    ownerName: string;
    truckName: string;
    document: string;
    phone: string;
    type: string;
    email: string;
    password: string;
    menu: TruckMenu[] = [];
    rating: Rating[] = [];
    truckSchedules: TruckSchedules[] = [];
    location: Location;
}
