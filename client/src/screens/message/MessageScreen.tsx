import { collection, onSnapshot, query, where } from "firebase/firestore";
import { SearchNormal1 } from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import { db } from "../../../firebaseConfig";
import {
  ContainerComponent,
  RowComponent,
  SectionComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { LoadingModal } from "../../modals";
import MessageItem from "./MessageItem";

const MessageScreen = ({ route }: any) => {
  const { userId }: { userId: number } = route.params;
  const [searchKey, setSearchKey] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    setIsVisible(true);

    const getQuerySnap = async () => {
      const q = query(
        collection(db, "conversations"),
        where("participantIds", "array-contains", userId)
      );
      await onSnapshot(q, (doc) => {
        if (doc.empty) {
          setConversations([]);
        } else {
          const items: any = [];
          doc.forEach((res) => {
            // console.log(`${res.id} => ${res.data()}`);
            items.push({ ...res.data(), id: res.id });
          });
          setConversations(items);
        }
      });
    };

    getQuerySnap();

    setIsVisible(false);
  }, []);

  return (
    <ContainerComponent back title="Message">
      <SectionComponent>
        <RowComponent
          styles={{
            backgroundColor: appColor.gray8,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 10,
          }}
        >
          <SearchNormal1 variant="TwoTone" color={appColor.gray} size={28} />
          <View
            style={{
              width: 1,
              height: 28,
              backgroundColor: appColor.gray2,
              marginHorizontal: 10,
            }}
          />
          <TextInput
            value={searchKey}
            style={{ color: appColor.text, flex: 1 }}
            onChangeText={(val) => setSearchKey(val)}
            placeholder="Tìm kiếm..."
          />
        </RowComponent>
      </SectionComponent>

      <SectionComponent>
        <RowComponent>
          <FlatList
            horizontal={true}
            data={conversations.sort((a: any, b: any) => b.msgLastTime - a.msgLastTime)}
            renderItem={({ item }) => (
              <MessageItem type="avatarCircle" conversation={item} />
            )}
          />
        </RowComponent>
      </SectionComponent>

      <SectionComponent>
        <FlatList
          data={conversations}
          renderItem={({ item }) => (
            <MessageItem type="default" conversation={item} />
          )}
        />
      </SectionComponent>

      <LoadingModal visible={isVisible} />
    </ContainerComponent>
  );
};

export default MessageScreen;
