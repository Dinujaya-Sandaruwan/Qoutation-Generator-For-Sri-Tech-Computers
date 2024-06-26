import { useRef } from "react";

type IdType = "STOCK" | "ST" | "ITEM";

const useUniqueId = (type: IdType) => {
  const idRef = useRef<number>(Date.now());

  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

    return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  };

  const generateUniqueId = () => {
    const newId = idRef.current + Math.floor(Math.random() * 1000);
    idRef.current = newId;
    return `${type}${formatDateTime(newId)}`;
  };

  return generateUniqueId;
};

export default useUniqueId;
