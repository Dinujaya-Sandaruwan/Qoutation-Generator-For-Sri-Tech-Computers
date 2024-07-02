import { useToast } from "react-native-toast-notifications";

interface Perameters {
  type: "normal" | "success" | "warning" | "danger";
  message: string;
}

const useTost = ({ type, message }: Perameters) => {
  const toast = useToast();
  toast.show(message, {
    type: type,
    placement: "bottom",
    duration: 4000,
    animationType: "slide-in",
  });
};

export default useTost;
