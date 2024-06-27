export interface BuildData {
  id: string;
  date: string;
  customerName: string;
  buildingBudget: number;
  advancedPayment: number;
  mobileNo: string;
  addressLineOne: string;
  addressLineTwo: string;
  additionalNotes: string;
  buildItems: BuildItem[];
  ordereFinished: boolean;
}

export interface BuildItem {
  itemId: string;
  itemValue: string;
  itemName: string;
  itemType: string;
  itemPrice: number;
  itemQuantity: number;
  itemWarranty: number;
  itemWarrantyType: string;
}
