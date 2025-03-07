import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { CartScreen, EditProfileScreen, ProfileScreen } from "../screens";

const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
