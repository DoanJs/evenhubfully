import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { SearchNormal1 } from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import { db } from "../../../firebaseConfig";
import {
  ButtonComponent,
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
  const [conversationId, setConversationId] = useState("");
  console.log(Date.now());
  const data = {
    title: "conversation1",
    avatar:
      "http://3.bp.blogspot.com/-ic11smjdIiI/U71Kx478QRI/AAAAAAAAjWY/TDhzGrYCxfw/s1600/dong-vat-hoang-da+(1).jpeg",
    isGroup: false,
    creatorId: userId,
    createAt: Date.now(),
    updateAt: Date.now(),
    deleteAt: Date.now(),
    participants: [userId, 2],
    msgLast: "",
    msgSenderLast: userId,
    msgTimeLast: "",
  };
  const dataMsg = {
    mediaUrl: "",
    message: "Hello, I am Js",
    receiverId: 2,
    senderId: userId,
    status: "send",
    createAt: Date.now(),
    updateAt: Date.now(),
    deleteAt: Date.now(),
    type: "text",
  };

  useEffect(() => {
    setIsVisible(true);

    const getQuerySnap = async () => {
      const q = query(
        collection(db, "conversations"),
        where("participants", "array-contains", userId)
      );
      await onSnapshot(q, (doc) => {
        if (doc.empty) {
          setConversations([]);
        } else {
          const items: any = [];
          doc.forEach((res) => {
            // console.log(`${res.id} => ${res.data()}`);
            items.push({
              id: res.id,
              ...res.data(),
            });
          });
          setConversations(items);
        }
      });
    };

    getQuerySnap();

    setIsVisible(false);
  }, []);

  const handleCreateConversation = async () => {
    const conversation = await addDoc(collection(db, "conversations"), data);

    setConversationId(conversation.id);
  };

  const handleCreateMsg = async () => {
    await addDoc(
      collection(db, `conversations/${conversationId}/messages`),
      dataMsg
    );
    await updateDoc(doc(db, "conversations", conversationId), {
      ...data,
      msgLast: dataMsg.message,
      msgTimeLast: dataMsg.createAt,
      msgSenderLast: userId,
    });
  };

  return (
    <ContainerComponent back title="Message">
      <SectionComponent>
        <ButtonComponent
          type="primary"
          text="Create Converstation"
          onPress={handleCreateConversation}
        />
        <ButtonComponent
          type="primary"
          text="Create Msg"
          onPress={handleCreateMsg}
        />
      </SectionComponent>

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
            data={conversations}
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
