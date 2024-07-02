import { useState, useEffect } from "react";

const usePhoneNumberFormatter = (
  phoneNumber: string,
  countryCode: string = "94"
): string => {
  const [formattedNumber, setFormattedNumber] = useState("");

  useEffect(() => {
    const formatNumber = (number: string) => {
      // Remove any non-digit characters
      const cleaned = number.replace(/\D/g, "");

      // Add the country code if not present and if length is 9 (assuming local number without country code)
      const withCountryCode =
        cleaned.length === 9 ? `${countryCode}${cleaned}` : cleaned;

      // Format the number
      const match = withCountryCode.match(/^(\d{1,3})(\d{2})(\d{3})(\d{4})$/);

      if (match) {
        return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
      }

      return phoneNumber; // Return original number if formatting fails
    };

    setFormattedNumber(formatNumber(phoneNumber));
  }, [phoneNumber, countryCode]);

  return formattedNumber;
};

export default usePhoneNumberFormatter;
