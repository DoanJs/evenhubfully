import { useMutation, useReactiveVar } from "@apollo/client";
import { SearchNormal1, TickCircle } from "iconsax-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from "../components";
import UserComponent from "../components/UserComponent";
import { appColor } from "../constants/appColor";
import { followingsVar, userVar } from "../graphqlClient/cache";
import { LoadingModal } from ".";
import { UserModel } from "../models/UserModel";
import { Share, Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { PushInviteNotificationsDocument } from "../gql/graphql";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  onClose: () => void;
  eventId: number;
  title: string;
  eventUsers?: UserModel[];
}

const ModalInvite = (props: Props) => {
  const { visible, onClose, eventId, title, eventUsers } = props;
  const user = useReactiveVar(userVar);
  const followings = useReactiveVar(followingsVar);
  const modalizeRef = useRef<Modalize>();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<UserModel[]>([]);
  const [pushInviteNotifications] = useMutation(
    PushInviteNotificationsDocument,
    {
      refetchQueries: [],
    }
  );

  useEffect(() => {
    if (visible) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [visible]);

  const handleSelectedUser = (following: UserModel) => {
    const items: UserModel[] = [...selectedUsers];

    const index = items.findIndex(
      (item: UserModel) => item.UserID === following.UserID
    );

    if (index === -1) {
      items.push(following);
    } else {
      items.splice(index, 1);
    }

    setSelectedUsers(items);
  };

  const handleInviteUser = async () => {
    const userIds = selectedUsers.map((user: UserModel) => user.UserID);

    // await pushInviteNotifications({
    //   variables: {
    //     userIds,
    //     authorId: user?.UserID as number,
    //     eventId,
    //   },
    // });

    const data = {
      from: user?.UserID,
      createAt: Date.now(),
      content: `Invite A Virtual Evening of ${title}`,
      eventId,
      isRead: false,
    };

    userIds.forEach(async (id: number) => {
      try {
        await addDoc(collection(db, "notifications"), {
          ...data,
          uid: id,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });

    onClose();
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const isEventUser = (user: UserModel): boolean => {
    const ind = eventUsers?.findIndex(
      (item: any) => item.UserID === user.UserID
    );
    return ind === -1;
  };

  return (
    <Portal>
      <Modalize
        handlePosition="inside"
        adjustToContentHeight
        ref={modalizeRef}
        onClose={onClose}
        FooterComponent={
          <RowComponent justify="center">
            <ButtonComponent
              text="Invite"
              type="primary"
              onPress={handleInviteUser}
            />
          </RowComponent>
        }
      >
        <SectionComponent styles={{ padding: 30 }}>
          <TextComponent text="Invite Friend" size={24} title />
          <InputComponent
            styles={{ marginTop: 12, marginBottom: 24 }}
            value=""
            onChange={(val) => console.log(val)}
            placeholder="Search"
            suffix={<SearchNormal1 size={20} color={appColor.primary} />}
          />

          {followings && followings.length > 0 ? (
            followings.map((following: any) => (
              <RowComponent key={following.UserID}>
                <UserComponent
                  onPress={
                    isEventUser(following)
                      ? () => handleSelectedUser(following)
                      : () => {}
                  }
                  type="Invite"
                  userId={following.UserID}
                />
                {isEventUser(following) ? (
                  <TickCircle
                    size={18}
                    color={
                      selectedUsers.findIndex(
                        (selected: UserModel) =>
                          selected.UserID === following.UserID
                      ) !== -1
                        ? appColor.primary
                        : appColor.gray2
                    }
                    variant="Bold"
                  />
                ) : (
                  <FontAwesome name="group" color={appColor.primary} />
                )}
              </RowComponent>
            ))
          ) : (
            <TextComponent text="No Friend" />
          )}
        </SectionComponent>
      </Modalize>
      <LoadingModal visible={isVisible} />
    </Portal>
  );
};

export default ModalInvite;
