import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

import Colors from "@/constants/Colors";

interface LoadingProps {
  message: string;
}

const Loading = ({ message }: LoadingProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.white} />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },
  loadingText: {
    color: Colors.white,
    fontSize: 20,
    marginTop: 10,
  },
});

export default Loading;
