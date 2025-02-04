import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text } from "react-native";
import NoNotification from "../assets/images/noNotification.png";
import {
  AvatarComponent,
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../components";
import { appColor } from "../constants/appColor";
import { globalStyles } from "../styles/gloabalStyles";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../graphqlClient/cache";
import { View } from "react-native";

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const user = useReactiveVar(userVar);

  const notification = {
    from: 2,
    to: "",
    createAt: Date.now(),
    content: "Hung Js Hung Js Hung Js Hung Js Hung Js Hung Js Hung Js Hung Js ",
    eventId: "",
    isRead: false,
  };

  useEffect(() => {
    const items: any = [];
    Array.from({ length: 100 }).forEach((item) =>
      items.push({ ...notification, id: Math.floor(Math.random() * 10000) })
    );

    setNotifications(items);
  }, []);

  return (
    <ContainerComponent
      isScroll={notifications.length < 0}
      back
      title="Notifications"
      right={
        <ButtonComponent
          icon={
            <Feather name="more-vertical" size={20} color={appColor.text} />
          }
        />
      }
    >
      {notifications.length > 0 ? (
        <>
          <FlatList
            data={notifications}
            renderItem={({ item, index }) => (
              <RowComponent
                key={`notification[${index}]`}
                styles={{
                  paddingHorizontal: 16,
                  marginBottom: 20,
                  alignItems: "flex-start",
                }}
              >
                <AvatarComponent
                  size={45}
                  name="ads"
                  photoURL="https://cckl.bacgiang.gov.vn/uploads/DOI2112-21.jpg"
                />
                <View
                  style={{ flex: 1, paddingHorizontal: 12, paddingRight: 28 }}
                >
                  <Text style={[globalStyles.text, { color: "coral" }]}>
                    {"asds"}
                    <Text style={[globalStyles.text]}>{item.content}</Text>
                  </Text>
                  <SpaceComponent height={16} />

                  <RowComponent justify="center">
                    <ButtonComponent
                      text="Reject"
                      type="primary"
                      styles={{ width: "50%" }}
                      color={appColor.white}
                      textColor={appColor.gray}
                    />
                    <SpaceComponent width={16}/>
                    <ButtonComponent
                      text="Accept"
                      type="primary"
                      styles={{ width: "50%" }}
                    />
                  </RowComponent>
                </View>

                <TextComponent color={appColor.gray} text="20 minutes" />
              </RowComponent>
            )}
          />
        </>
      ) : (
        <SectionComponent styles={[globalStyles.center, { height: "100%" }]}>
          <Image source={NoNotification} style={{ width: "50%" }} />
          <TextComponent
            text="No Notifications!"
            title
            size={18}
            color="#344B67"
          />
          <SpaceComponent height={16} />
          <TextComponent
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor"
            styles={{ width: "80%" }}
            size={16}
            color="#344B67"
          />
        </SectionComponent>
      )}
    </ContainerComponent>
  );
};

export default NotificationsScreen;
