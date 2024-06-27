import { BuildData, BuildItem } from "@/interfaces/buildData";
import { create } from "zustand";

const useBuildData = create<
  BuildData & {
    setId: (id: string) => void;
    setDate: (date: string) => void;
    setCustomerName: (customerName: string) => void;
    setBuildingBudget: (buildingBudget: number) => void;
    setAdvancedPayment: (advancedPayment: number) => void;
    setMobileNo: (mobileNo: string) => void;
    setAddressLineOne: (addressLineOne: string) => void;
    setAddressLineTwo: (addressLineTwo: string) => void;
    setAdditionalNotes: (additionalNotes: string) => void;
    setBuildItems: (buildItems: BuildItem[]) => void;
    addBuildItem: (item: BuildItem) => void;
    updateBuildItem: (updatedItem: BuildItem) => void;
    deleteBuildItem: (itemId: string) => void;
    setItemId: (itemId: string, newId: string) => void;
    setItemValue: (itemId: string, itemValue: string) => void;
    setItemQuantity: (itemId: string, itemQuantity: number) => void;
    setItemName: (itemId: string, itemName: string) => void;
    setItemType: (itemId: string, itemType: string) => void;
    setItemPrice: (itemId: string, itemPrice: number) => void;
    setItemWarranty: (itemId: string, itemWarranty: number) => void;
    setItemWarrantyType: (itemId: string, itemWarrantyType: string) => void;
  }
>((set) => ({
  id: "",
  date: "",
  customerName: "",
  buildingBudget: 0,
  advancedPayment: 0,
  mobileNo: "",
  addressLineOne: "",
  addressLineTwo: "",
  additionalNotes: "",
  buildItems: [],
  ordereFinished: false,

  setId: (id: string) => set({ id }),
  setDate: (date: string) => set({ date }),
  setCustomerName: (customerName: string) => set({ customerName }),
  setBuildingBudget: (buildingBudget: number) => set({ buildingBudget }),
  setAdvancedPayment: (advancedPayment: number) => set({ advancedPayment }),
  setMobileNo: (mobileNo: string) => set({ mobileNo }),
  setAddressLineOne: (addressLineOne: string) => set({ addressLineOne }),
  setAddressLineTwo: (addressLineTwo: string) => set({ addressLineTwo }),
  setAdditionalNotes: (additionalNotes: string) => set({ additionalNotes }),
  setBuildItems: (buildItems: BuildItem[]) => set({ buildItems }),

  addBuildItem: (item: BuildItem) =>
    set((state) => ({
      buildItems: [...state.buildItems, item],
    })),

  updateBuildItem: (updatedItem: BuildItem) =>
    set((state) => ({
      buildItems: state.buildItems.map((item) =>
        item.itemId === updatedItem.itemId ? updatedItem : item
      ),
    })),

  deleteBuildItem: (itemId: string) =>
    set((state) => ({
      buildItems: state.buildItems.filter((item) => item.itemId !== itemId),
    })),

  setItemId: (itemId: string, newId: string) =>
    set((state) => ({
      buildItems: state.buildItems.map((item) =>
        item.itemId === itemId ? { ...item, itemId: newId } : item
      ),
    })),
  setItemQuantity: (itemId: string, itemQuantity: number) =>
    set((state) => ({
      buildItems: state.buildItems.map((item) =>
        item.itemId === itemId ? { ...item, itemQuantity: itemQuantity } : item
      ),
    })),
  setItemValue: (itemId: string, itemValue: string) =>
    set((state) => ({
      buildItems: state.buildItems.map((item) =>
        item.itemId === itemId ? { ...item, itemId: itemValue } : item
      ),
    })),

  setItemName: (itemId: string, itemName: string) =>
    set((state) => ({
      buildItems: state.buildItems.map((item) =>
        item.itemId === itemId ? { ...item, itemName } : item
      ),
    })),

  setItemType: (itemId: string, itemType: string) =>
    set((state) => ({
      buildItems: state.buildItems.map((item) =>
        item.itemId === itemId ? { ...item, itemType } : item
      ),
    })),

  setItemPrice: (itemId: string, itemPrice: number) =>
    set((state) => ({
      buildItems: state.buildItems.map((item) =>
        item.itemId === itemId ? { ...item, itemPrice } : item
      ),
    })),

  setItemWarranty: (itemId: string, itemWarranty: number) =>
    set((state) => ({
      buildItems: state.buildItems.map((item) =>
        item.itemId === itemId ? { ...item, itemWarranty } : item
      ),
    })),

  setItemWarrantyType: (itemId: string, itemWarrantyType: string) =>
    set((state) => ({
      buildItems: state.buildItems.map((item) =>
        item.itemId === itemId ? { ...item, itemWarrantyType } : item
      ),
    })),
}));

export default useBuildData;
