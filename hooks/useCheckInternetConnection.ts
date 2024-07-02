import NetInfo from "@react-native-community/netinfo";
import { useToast } from "react-native-toast-notifications";

const useCheckInternetConnection = async () => {
  const toast = useToast();

  const checkConnection = async () => {
    try {
      // Check the network state
      const state = await NetInfo.fetch();

      if (state.isConnected && state.isInternetReachable) {
        // Try to fetch from your server
        const response = await fetch("https://firebase.google.com", {
          method: "HEAD",
        });

        if (response.ok) {
          return { status: "ok" };
        } else {
          return toast.show(
            "Internet connection is active, but cloud server is not reachable.",
            {
              type: "danger",
            }
          );
        }
      } else {
        return toast.show(
          "No internet connection. Please check your connection and try again",
          {
            type: "danger",
          }
        );
      }
    } catch (error) {
      return toast.show(
        "No internet connection. Please check your connection and try again",
        {
          type: "danger",
        }
      );
    }
  };

  return checkConnection;
};

useCheckInternetConnection();
