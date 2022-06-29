import { HistoryItem } from "./history-item.model";

export interface FilteredHistoryItemsModel {
  numberOfHistoryItems: number,
  historyItems: HistoryItem[]
}
