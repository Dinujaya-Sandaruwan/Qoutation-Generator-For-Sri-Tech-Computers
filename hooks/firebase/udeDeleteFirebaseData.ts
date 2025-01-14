import { db } from "@/firebase/config";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useState } from "react";

const useDeleteCollectionData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteCollectionData = async (collectionName: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(collectionRef);

      const deletePromises = querySnapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, collectionName, docSnap.id))
      );
      await Promise.all(deletePromises);

      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setLoading(false);
      setError(err as Error);
    }
  };

  return { deleteCollectionData, loading, error, success };
};

export default useDeleteCollectionData;
