import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const useFirestoreData = <T>(collectionName: string, pageSize: number = 10) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const collectionRef = collection(db, collectionName);
      let q;

      if (lastDoc) {
        q = query(
          collectionRef,
          orderBy("id"),
          startAfter(lastDoc),
          limit(pageSize)
        );
      } else {
        q = query(collectionRef, orderBy("id"), limit(pageSize));
      }

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const newData = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as T)
      );
      setData((prevData) => [...prevData, ...newData]);
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err as Error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, fetchData, hasMore };
};

export default useFirestoreData;
