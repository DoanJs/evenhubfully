import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { CategoryDetail, HomeScreen } from "../screens";

const ExploreNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
    </Stack.Navigator>
  );
};

export default ExploreNavigator;
