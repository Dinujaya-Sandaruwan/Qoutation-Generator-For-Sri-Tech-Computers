import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";

const useFirestoreData = <T>(collectionName: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(collectionRef);

      const allData = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as T)
      );
      setData(allData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err as Error);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFirestoreData;
