import { useState, useEffect } from "react";

const useReducedString = () => {
  const reducedString = (inputText: string, maxChars: number) => {
    if (inputText.length > maxChars) {
      return `${inputText.slice(0, maxChars)}...`;
    } else {
      return inputText;
    }
  };

  return reducedString;
};

export default useReducedString;
