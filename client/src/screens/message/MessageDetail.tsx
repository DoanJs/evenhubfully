import { useMutation, useReactiveVar } from "@apollo/client";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Animated,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
} from "react-native";
import { db } from "../../../firebaseConfig";
import {
  AvatarComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { CreateMessageDocument } from "../../gql/graphql";
import { userVar } from "../../graphqlClient/cache";
import { LoadingModal } from "../../modals";
import { ConversationModel } from "../../models/ConversationModel";
import { MessageModel } from "../../models/MessageModel";
import { globalStyles } from "../../styles/gloabalStyles";
import { handleSelectedFromArr } from "../../utils/handleSelected";
import MessageSub from "./MessageSub";

const MessageDetail = ({ route }: any) => {
  const { conversation }: { conversation: ConversationModel } = route.params;
  const user = useReactiveVar(userVar);
  const [isVisible, setIsVisible] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [createMessage] = useMutation(CreateMessageDocument, {
    refetchQueries: [],
  });

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", (event) => {
      setKeyboardHeight(event.endCoordinates.height - 34);
    });

    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

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
        await updateDoc(doc(db, `conversations/${conversation.id}`), {
          msgLast: searchKey,
          msgLastSenderId: user?.UserID,
          msgLastTime: Date.now(),
        });

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
      avatar={
        <AvatarComponent
          photoURL={handleSelectedFromArr(
            conversation.avatar,
            user?.UserID as number
          )}
          name=""
        />
      }
      statusAction={
        <TextComponent
          text="Hoạt động 15 phút trước"
          styles={{ fontSize: 10 }}
          color={appColor.gray}
        />
      }
      title={handleSelectedFromArr(conversation.title, user?.UserID as number)}
      right={
        <RowComponent>
          <FontAwesome name="phone" size={20} color={appColor.primary} />
          <SpaceComponent width={14} />
          <FontAwesome5 name="video" size={20} color={appColor.primary} />
        </RowComponent>
      }
      styles={{ flex: 1 }}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <SectionComponent>
          <FlatList
            data={messages.sort((a: any, b: any) => a.createAt - b.createAt)}
            renderItem={({
              item,
              index,
            }: {
              item: MessageModel;
              index: number;
            }) => {
              let grMsg = false;
              let msgCenter = false;
              let msgTop = false;
              let msgBottom = false;
              if (
                messages[index - 1] &&
                messages[index + 1] &&
                item.senderId === messages[index - 1].senderId &&
                item.senderId === messages[index + 1].senderId
              ) {
                msgCenter = true;
              }
              if (
                messages[index + 1] &&
                messages[index + 1].senderId === item.senderId
              ) {
                msgTop = true;
              }
              if (
                messages[index - 1] &&
                messages[index - 1].senderId === item.senderId
              ) {
                msgBottom = true;
              }
              if (
                (!messages[index + 1] && item.senderId !== user?.UserID) ||
                (messages[index + 1] &&
                  messages[index + 1].senderId === user?.UserID)
              ) {
                grMsg = true;
              }
              return (
                <MessageSub
                  message={item}
                  grMsg={grMsg}
                  msgTop={msgTop}
                  msgBottom={msgBottom}
                  msgCenter={msgCenter}
                  conversation={conversation}
                  user={user}
                />
              );
            }}
          />
        </SectionComponent>

        <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
          <Animated.View
            style={{
              position: "absolute",
              bottom: keyboardHeight,
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
          </Animated.View>

          <LoadingModal visible={isVisible} />
        </Pressable>
      </KeyboardAvoidingView>
    </ContainerComponent>
  );
};

export default MessageDetail;
