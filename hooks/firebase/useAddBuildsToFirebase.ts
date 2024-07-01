import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { BuildData } from "@/interfaces/buildData";

const useAddBuildDataToFirebase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addBuildDataToFirebase = async (
    data: BuildData,
    collectionName: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const collectionRef = collection(db, collectionName);

      // Add new data
      await addDoc(collectionRef, data);

      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      setError(err as Error);
      return { success: false, error: err };
    }
  };

  return { addBuildDataToFirebase, loading, error };
};

export default useAddBuildDataToFirebase;
