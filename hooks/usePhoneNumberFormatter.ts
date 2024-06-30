import { useState, useEffect } from "react";

const usePhoneNumberFormatter = (phoneNumber: string): string => {
  const [formattedNumber, setFormattedNumber] = useState("");

  useEffect(() => {
    const formatNumber = (number: string) => {
      // Remove any non-digit characters
      const cleaned = number.replace(/\D/g, "");

      // Add the country code if not present
      const withCountryCode = cleaned.length === 9 ? `94${cleaned}` : cleaned;

      // Format the number
      const match = withCountryCode.match(/^(\d{2})(\d{2})(\d{3})(\d{4})$/);

      if (match) {
        return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
      }

      return number;
    };

    setFormattedNumber(formatNumber(phoneNumber));
  }, [phoneNumber]);

  return formattedNumber;
};

export default usePhoneNumberFormatter;
