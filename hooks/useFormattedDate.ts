import { useState, useEffect } from "react";

const useFormattedDate = () => {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
      const day = date.getDate().toString().padStart(2, "0");

      return `${year}/${month}/${day}`;
    };

    const today = new Date();
    setFormattedDate(formatDate(today));
  }, []);

  return formattedDate;
};

export default useFormattedDate;
