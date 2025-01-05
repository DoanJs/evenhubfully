import { useReactiveVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Bookmark2,
  Calendar,
  Logout,
  MessageQuestion,
  Messages2,
  Setting2,
  Sms,
  User,
} from "iconsax-react-native";
import React, { ReactNode } from "react";
import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { appColor } from "../constants/appColor";
import { tokenVar, userVar } from "../graphqlClient/cache";
import { globalStyles } from "../styles/gloabalStyles";
import AvatarComponent from "./AvatarComponent";
import RowComponent from "./RowComponent";
import SpaceComponent from "./SpaceComponent";
import TextComponent from "./TextComponent";

interface ProfileMenu {
  key: string;
  title: string;
  icon: ReactNode;
}

const size = 20;
const color = appColor.gray;
const profileMenu: ProfileMenu[] = [
  {
    key: "MyProfile",
    title: "My Profile",
    icon: <User size={size} color={color} />,
  },
  {
    key: "Message",
    title: "Message",
    icon: <Messages2 size={size} color={color} />,
  },
  {
    key: "Calendar",
    title: "Calendar",
    icon: <Calendar size={size} color={color} />,
  },
  {
    key: "Bookmark",
    title: "Bookmark",
    icon: <Bookmark2 size={size} color={color} />,
  },
  {
    key: "ContactUs",
    title: "Contact Us",
    icon: <Sms size={size} color={color} />,
  },
  {
    key: "Settings",
    title: "Settings",
    icon: <Setting2 size={size} color={color} />,
  },
  {
    key: "HelpAndFAQs",
    title: "Help & FAQs",
    icon: <MessageQuestion size={size} color={color} />,
  },
  {
    key: "SignOut",
    title: "Sign Out",
    icon: <Logout size={size} color={color} />,
  },
];

const DrawerCustom = ({ navigation }: any) => {
  const user = useReactiveVar(userVar);

  const handleSignOut = async () => {
    await AsyncStorage.setItem("user", user ? user.Email : "");
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    tokenVar("");
  };

  const handleNavigation = (key: string) => {
    navigation.closeDrawer();

    switch (key) {
      case "SignOut":
        handleSignOut();
        break;
      case "MyProfile":
        navigation.navigate("HomeNavigator", {
          screen: "Profile",
          params: {
            screen: "ProfileScreen",
          },
        });
        break;

      default:
        break;
    }
  };

  return (
    <View style={[localStyles.container]}>
      <AvatarComponent
        onPress={() => handleNavigation("MyProfile")}
        name={user?.Username ?? (user?.Email as string)}
        photoURL={user?.PhotoUrl}
        size={56}
      />
      <TextComponent text={user?.Username ?? (user?.Email as string)} />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileMenu}
        style={{ flex: 1, marginVertical: 20 }}
        renderItem={({ item, index }) => (
          <RowComponent
            key={index}
            styles={[localStyles.listItem]}
            onPress={() => handleNavigation(item.key)}
          >
            {item.icon}
            <TextComponent
              text={item.title}
              styles={[localStyles.listItemText]}
            />
          </RowComponent>
        )}
      />

      <RowComponent justify="flex-start">
        <TouchableOpacity
          style={[
            globalStyles.button,
            { backgroundColor: "#00f8ff33", height: "auto" },
          ]}
        >
          <MaterialCommunityIcons name="crown" size={22} color="#00f8ff" />
          <SpaceComponent width={8} />
          <TextComponent text="Upgrade Pro" color="#00f8ff" />
        </TouchableOpacity>
      </RowComponent>
    </View>
  );
};

export default DrawerCustom;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: Platform.OS === "android" ? StatusBar.currentHeight : 48,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 100,
    marginBottom: 12,
  },
  listItem: {
    paddingVertical: 12,
    justifyContent: "flex-start",
  },
  listItemText: {
    paddingLeft: 12,
  },
});
