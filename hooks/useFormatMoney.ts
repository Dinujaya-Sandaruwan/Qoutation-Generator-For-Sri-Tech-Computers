import { useState, useEffect } from "react";

function useFormatMoney() {
  return (amount: number) => {
    const [formattedAmount, setFormattedAmount] = useState("");

    useEffect(() => {
      const formatMoney = (num: number) => {
        // Convert the number to a string with two decimal places
        let str = num.toFixed(2);
        // Split the string into the integer and decimal parts
        let [intPart, decPart] = str.split(".");

        // Add commas to the integer part
        intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return `Rs.${intPart}.${decPart}`;
      };

      if (amount !== null && amount !== undefined) {
        setFormattedAmount(formatMoney(amount));
      }
    }, [amount]);

    return formattedAmount;
  };
}

export default useFormatMoney;
