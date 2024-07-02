import { useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { ProductData } from "@/interfaces/productsData";
import { StockData } from "@/interfaces/stockData";

const useAddDataToFirebase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addDataToFirebase = async (
    data: ProductData[] | StockData[],
    collectionName: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const collectionRef = collection(db, collectionName);

      // Get all existing documents in the collection
      const querySnapshot = await getDocs(collectionRef);

      // Remove all existing documents
      const deletePromises = querySnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );
      await Promise.all(deletePromises);

      // Add new data
      const addPromises = data.map((item) => addDoc(collectionRef, item));
      await Promise.all(addPromises);

      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      setError(err as Error);
      return { success: false, error: err };
    }
  };

  return { addDataToFirebase, loading, error };
};

export default useAddDataToFirebase;
