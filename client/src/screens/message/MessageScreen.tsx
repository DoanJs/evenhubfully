import { useRoute } from "@react-navigation/native";
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
  AvatarComponent,
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import MessageItem from "./MessageItem";
import MessageCircle from "./MessageCircle";
import { useQuery, useReactiveVar } from "@apollo/client";
import { GetUserIdDocument } from "../../gql/graphql";
import { UserModel } from "../../models/UserModel";
import { followingsVar } from "../../graphqlClient/cache";

const MessageScreen = ({route}: any) => {
  const { userId }: { userId: number } = route.params;
  const followings = useReactiveVar(followingsVar)

  const [searchKey, setSearchKey] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [conversationId, setConversationId] = useState("");

  console.log(followings.length)

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
        <RowComponent>
          <MessageCircle />
          <MessageCircle />
          <MessageCircle />
          <MessageCircle />
          <MessageCircle />
          <MessageCircle />
        </RowComponent>
      </SectionComponent>

      <SectionComponent>
        <RowComponent
          styles={{
            backgroundColor: appColor.gray8,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 10,
          }}
        >
          <SearchNormal1 variant="TwoTone" color={appColor.gray} size={24} />
          <View
            style={{
              width: 1,
              height: 24,
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
        <FlatList
          data={conversations}
          renderItem={({ item }) => <MessageItem conversation={item} />}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default MessageScreen;
