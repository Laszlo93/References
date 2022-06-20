import { SotrageModel } from "./storage.model";

export interface Item {
  _id: string,
  name: string,
  drawingNumber: string,
  customerDrawingNumber: string,
  storage: SotrageModel,
  quantity: number,
}
