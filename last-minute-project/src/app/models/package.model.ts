import { ProgramModel } from "./program.model";

export interface PackageModel {
    id: number,
    name: string
    description: string,
    hotelName: string,
    meals: string,
    city: string,
    price: number,
    days: number,
    travelCar: boolean,
    travelBus: boolean,
    travelTrain: boolean,
    options: Array<ProgramModel>
}