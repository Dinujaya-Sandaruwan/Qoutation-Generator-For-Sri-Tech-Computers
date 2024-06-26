export interface BuildData {
  id: string;
  date: string;
  customerName: string;
  buildingBudget: number;
  advancedPayment: number;
  mobileNo: string;
  address: string;
  additionalNotes: string;
  buildItems: BuildItem[];
  ordereFinished: boolean;
}

export interface BuildItem {
  itemId: string;
  itemName: string;
  itemType: string;
  itemPrice: number;
  // itemQuantity: number;
  itemWarranty: number;
  itemWarrantyType: string;
}
