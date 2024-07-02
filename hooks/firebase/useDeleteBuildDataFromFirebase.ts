import { useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";

const useDeleteBuildDataFromFirebase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteBuildDataFromFirebase = async (
    buildDataId: string,
    collectionName: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where("id", "==", buildDataId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id; // Get the document ID of the first matching document
        const docRef = querySnapshot.docs[0].ref;

        // Delete the document
        await deleteDoc(docRef);

        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return {
          success: false,
          error: new Error("No document found with the provided id"),
        };
      }
    } catch (err) {
      setLoading(false);
      setError(err as Error);
      return { success: false, error: err };
    }
  };

  return { deleteBuildDataFromFirebase, loading, error };
};

export default useDeleteBuildDataFromFirebase;
