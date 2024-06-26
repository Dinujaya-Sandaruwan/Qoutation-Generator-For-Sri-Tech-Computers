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
    setAddress: (address: string) => void;
    setAdditionalNotes: (additionalNotes: string) => void;
    setBuildItems: (buildItems: BuildItem[]) => void;
    addBuildItem: (item: BuildItem) => void;
    updateBuildItem: (updatedItem: BuildItem) => void;
    deleteBuildItem: (itemId: string) => void;
    setItemId: (index: number, itemId: string) => void;
    setItemName: (index: number, itemName: string) => void;
    setItemType: (index: number, itemType: string) => void;
    setItemPrice: (index: number, itemPrice: number) => void;
    setItemWarranty: (index: number, itemWarranty: number) => void;
    setItemWarrantyType: (index: number, itemWarrantyType: string) => void;
  }
>((set) => ({
  id: "",
  date: "",
  customerName: "",
  buildingBudget: 0,
  advancedPayment: 0,
  mobileNo: "",
  address: "",
  additionalNotes: "",
  buildItems: [],
  ordereFinished: false,

  setId: (id: string) => set({ id }),
  setDate: (date: string) => set({ date }),
  setCustomerName: (customerName: string) => set({ customerName }),
  setBuildingBudget: (buildingBudget: number) => set({ buildingBudget }),
  setAdvancedPayment: (advancedPayment: number) => set({ advancedPayment }),
  setMobileNo: (mobileNo: string) => set({ mobileNo }),
  setAddress: (address: string) => set({ address }),
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

  setItemId: (index: number, itemId: string) =>
    set((state) => {
      const newBuildItems = [...state.buildItems];
      newBuildItems[index] = { ...newBuildItems[index], itemId };
      return { buildItems: newBuildItems };
    }),

  setItemName: (index: number, itemName: string) =>
    set((state) => {
      const newBuildItems = [...state.buildItems];
      newBuildItems[index] = { ...newBuildItems[index], itemName };
      return { buildItems: newBuildItems };
    }),

  setItemType: (index: number, itemType: string) =>
    set((state) => {
      const newBuildItems = [...state.buildItems];
      newBuildItems[index] = { ...newBuildItems[index], itemType };
      return { buildItems: newBuildItems };
    }),

  setItemPrice: (index: number, itemPrice: number) =>
    set((state) => {
      const newBuildItems = [...state.buildItems];
      newBuildItems[index] = { ...newBuildItems[index], itemPrice };
      return { buildItems: newBuildItems };
    }),

  setItemWarranty: (index: number, itemWarranty: number) =>
    set((state) => {
      const newBuildItems = [...state.buildItems];
      newBuildItems[index] = { ...newBuildItems[index], itemWarranty };
      return { buildItems: newBuildItems };
    }),

  setItemWarrantyType: (index: number, itemWarrantyType: string) =>
    set((state) => {
      const newBuildItems = [...state.buildItems];
      newBuildItems[index] = { ...newBuildItems[index], itemWarrantyType };
      return { buildItems: newBuildItems };
    }),
}));

export default useBuildData;
