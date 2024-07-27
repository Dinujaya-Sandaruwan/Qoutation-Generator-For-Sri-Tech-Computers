import { create } from "zustand";

interface QuotationDataTypeStore {
  quotationDataType: string;
  setQuotationDataType: (
    type: "Minimal" | "With Blanks" | "Full Details"
  ) => void;
}

const quotationDataTypeStore = create<QuotationDataTypeStore>((set) => ({
  quotationDataType: "Minimal",
  setQuotationDataType: (type) => set({ quotationDataType: type }),
}));

export default quotationDataTypeStore;
