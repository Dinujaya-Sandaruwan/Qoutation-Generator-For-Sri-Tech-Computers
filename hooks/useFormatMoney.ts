import { useCallback } from "react";

function useFormatMoney() {
  const formatMoney = useCallback((num: number) => {
    // Convert the number to a string with two decimal places
    let str = num.toFixed(2);
    // Split the string into the integer and decimal parts
    let [intPart, decPart] = str.split(".");

    // Add commas to the integer part
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `Rs.${intPart}.${decPart}`;
  }, []);

  return formatMoney;
}

export default useFormatMoney;
