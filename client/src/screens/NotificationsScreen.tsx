import { useReactiveVar } from "@apollo/client";
import { Feather } from "@expo/vector-icons";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import { db } from "../../firebaseConfig";
import NoNotification from "../assets/images/noNotification.png";
import {
  ButtonComponent,
  ContainerComponent,
  NotificationItem,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../components";
import { appColor } from "../constants/appColor";
import { userVar } from "../graphqlClient/cache";
import { LoadingModal } from "../modals";
import { NotificationModel } from "../models/NotificationModel";
import { globalStyles } from "../styles/gloabalStyles";

const NotificationsScreen = () => {
  const user = useReactiveVar(userVar);
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const getQuerySnap = async () => {
      const q = query(
        collection(db, "notifications"),
        // where("isRead", "==", false),
        where("uid", "==", user?.UserID)
      );
      await onSnapshot(q, (doc) => {
        if (doc.empty) {
          setNotifications([]);
        } else {
          const items: any = [];
          doc.forEach((res) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            items.push({
              id: res.id,
              ...res.data(),
            });
          });

          setNotifications(items);
        }
      });
      // const q = query(
      //   collection(db, "notifications"),
      //   // where("isRead", "==", false),
      //   where("uid", "==", user?.UserID)
      // );

      // const querySnapshot = await getDocs(q);
      // if (querySnapshot.empty) {
      //   setNotifications([]);
      // } else {
      //   const items: any = [];
      //   querySnapshot.forEach((doc) => {
      //     // console.log(`${doc.id} => ${doc.data()}`);
      //     items.push({
      //       id: doc.id,
      //       ...doc.data(),
      //     });
      //   });

      //   setNotifications(items);
      // }
    };

    getQuerySnap();

    setIsVisible(false);
  }, []);

  const handleCheckToReadAllNotifications = () => {
    setIsUpdating(true);
    try {
      notifications.length > 0 &&
        notifications.forEach(async (item: NotificationModel) => {
          const washingtonRef = doc(db, "notifications", item.id);
          await updateDoc(washingtonRef, { ...item, isRead: true });
        });
    } catch (error) {
      console.log(error);
    }
    setIsUpdating(false);
  };

  return (
    <ContainerComponent
      isScroll={notifications.length < 0}
      back
      title="Notifications"
      right={
        <ButtonComponent
          onPress={handleCheckToReadAllNotifications}
          icon={<Feather name="check-square" size={20} color={appColor.text} />}
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
            styles={{ width: "80%", textAlign: "center" }}
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
