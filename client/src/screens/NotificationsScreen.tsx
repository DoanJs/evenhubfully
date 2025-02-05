import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text } from "react-native";
import NoNotification from "../assets/images/noNotification.png";
import {
  AvatarComponent,
  ButtonComponent,
  ContainerComponent,
  NotificationItem,
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
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { NotificationModel } from "../models/NotificationModel";
import { LoadingModal } from "../modals";

const NotificationsScreen = () => {
  const user = useReactiveVar(userVar);
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const getQuerySnap = async () => {
      const q = query(
        collection(db, "notifications"),
        // where("isRead", "==", false),
        where("uid", "==", user?.UserID)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setNotifications([]);
      } else {
        const items: any = [];
        querySnapshot.forEach((doc) => {
          // console.log(`${doc.id} => ${doc.data()}`);
          items.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setNotifications(items);

        setIsVisible(false);
      }
    };

    getQuerySnap();
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
            style={{ paddingTop: 16 }}
            showsVerticalScrollIndicator={false}
            data={notifications}
            renderItem={({
              item,
              index,
            }: {
              item: NotificationModel;
              index: number;
            }) => (
              <NotificationItem
                notification={item}
                key={`notification[${index}]`}
              />
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

      <LoadingModal visible={isVisible} />
    </ContainerComponent>
  );
};

export default NotificationsScreen;
