import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

const EventsScreen = () => {
  const route = useRoute()
  console.log(route.params)
  return (
    <View>
      <Text>EventsScreen</Text>

      <Text>JS</Text>
    </View>
  );
};

export default EventsScreen;
