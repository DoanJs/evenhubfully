import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import {
  AvatarComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { LoadingModal } from "../../modals";
import { ConversationModel } from "../../models/ConversationModel";
import { globalStyles } from "../../styles/gloabalStyles";
import MessageSub from "./MessageSub";
import {
  query,
  collection,
  where,
  onSnapshot,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useMutation, useReactiveVar } from "@apollo/client";
import { CreateMessageDocument } from "../../gql/graphql";
import { userVar } from "../../graphqlClient/cache";
import { MessageModel } from "../../models/MessageModel";

const MessageDetail = ({ route }: any) => {
  const { conversation }: { conversation: ConversationModel } = route.params;
  const user = useReactiveVar(userVar);
  const [isVisible, setIsVisible] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [messages, setMessages] = useState([]);
  const [createMessage] = useMutation(CreateMessageDocument, {
    refetchQueries: [],
  });

  useEffect(() => {
    setIsVisible(true);

    const getQuerySnap = async () => {
      const q = query(
        collection(db, `conversations/${conversation.id}/messages`)
      );
      await onSnapshot(q, (doc) => {
        if (doc.empty) {
          setMessages([]);
        } else {
          const items: any = [];
          doc.forEach((res: any) => {
            items.push({ ...res.data(), id: res.id });
          });
          setMessages(items);
        }
      });
    };

    getQuerySnap();

    setIsVisible(false);
  }, [conversation.id]);

  const handleSendMsg = () => {
    setIsVisible(true);
    const messageInput = {
      type: "text",
      message: searchKey,
      senderId: user?.UserID,
      receiverId: null,
      conversationId: Number(conversation.id),
    };

    createMessage({
      variables: {
        messageInput,
      },
    })
      .then(async (result) => {
        await setDoc(
          doc(
            db,
            `conversations/${conversation.id}/messages`,
            `${result.data?.createMessage.MessageID}`
          ),
          {
            ...messageInput,
            mediaUrl: "",
            status: "",
            createAt: Date.now(),
            updateAt: null,
            deleteAt: null,
          }
        );

        setSearchKey("");
        setIsVisible(false);
      })
      .catch((err) => {
        console.log(err);
        setIsVisible(false);
      });
  };

  return (
    <ContainerComponent
      back
      avatar={<AvatarComponent photoURL={conversation.avatar} name="" />}
      statusAction={
        <TextComponent
          text="Hoạt động 15 phút trước"
          styles={{ fontSize: 10 }}
          color={appColor.gray}
        />
      }
      title={conversation.title}
      right={
        <RowComponent>
          <FontAwesome name="phone" size={20} color={appColor.primary} />
          <SpaceComponent width={14} />
          <FontAwesome5 name="video" size={20} color={appColor.primary} />
        </RowComponent>
      }
      styles={{ flex: 1}}
    >
      <SectionComponent>
        <FlatList
          data={messages}
          renderItem={({ item }: { item: MessageModel }) => (
            <MessageSub message={item} conversation={conversation} />
          )}
        />
      </SectionComponent>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: appColor.gray8,
        }}
      >
        <RowComponent
          styles={{
            alignItems: "center",
            backgroundColor: appColor.gray8,
            paddingHorizontal: 10,
            paddingVertical: 10,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <TextInput
            value={searchKey}
            style={[
              globalStyles.inputContainer,
              { color: appColor.text, flex: 1, marginBottom: 0 },
            ]}
            onChangeText={(val) => setSearchKey(val)}
            placeholder="Aa..."
          />
          <SpaceComponent width={10} />
          <FontAwesome
            name="send"
            size={24}
            color={appColor.primary}
            onPress={() => handleSendMsg()}
          />
        </RowComponent>
      </View>

      <LoadingModal visible={isVisible} />
    </ContainerComponent>
  );
};

export default MessageDetail;
