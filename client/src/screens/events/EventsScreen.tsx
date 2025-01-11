import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { useStatusBar } from "../../utils/useStatusBar";

const EventsScreen = () => {
  const route = useRoute();
  useStatusBar("dark-content");
  return (
    <View>
      <Text>EventsScreen</Text>

      <Text>JS</Text>
    </View>
  );
};

export default EventsScreen;
