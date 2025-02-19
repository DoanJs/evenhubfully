import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import DrawerNavigator from "./DrawerNavigator";
import { Host } from "react-native-portalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { EventDetail, ExploreEvents, MessageScreen, NotFound, NotificationsScreen, PaymentScreen, ProfileScreen, SearchEvents } from "../screens";

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Host>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={DrawerNavigator} />
          <Stack.Screen name="EventDetail" component={EventDetail} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="ExploreEvents" component={ExploreEvents} />
          <Stack.Screen name="SearchEvents" component={SearchEvents} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
          <Stack.Screen name="MessageScreen" component={MessageScreen} />
          <Stack.Screen name="NotFound" component={NotFound} />
        </Stack.Navigator>
      </Host>
    </GestureHandlerRootView>
  );
};

export default MainNavigator;
