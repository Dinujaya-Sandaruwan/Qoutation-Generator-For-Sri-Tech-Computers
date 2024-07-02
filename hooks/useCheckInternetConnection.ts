import { useCallback } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useToast } from "react-native-toast-notifications";

const useCheckInternetConnection = () => {
  const toast = useToast();

  const checkConnection = useCallback(async () => {
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
          toast.show(
            "Internet connection is active, but cloud server is not reachable.",
            {
              type: "danger",
            }
          );
          return { status: "server unreachable" };
        }
      } else {
        toast.show(
          "No internet connection. Please check your connection and try again.",
          {
            type: "danger",
          }
        );
        return { status: "no internet" };
      }
    } catch (error) {
      toast.show("An error occurred while checking the internet connection.", {
        type: "danger",
      });
      return { status: "error", error };
    }
  }, [toast]);

  return checkConnection;
};

export default useCheckInternetConnection;
