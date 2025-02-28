import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  AvatarComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from "../../components";
import { ConversationModel } from "../../models/ConversationModel";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../../graphqlClient/cache";
import { View } from "react-native";
import moment from "moment";
import { handleSelectedFromArr } from "../../utils/handleSelected";

interface Props {
  type: "avatarCircle" | "default";
  conversation: ConversationModel;
}

const MessageItem = (props: Props) => {
  const { type, conversation } = props;
  const navigation: any = useNavigation();
  const user = useReactiveVar(userVar);
  const [isNewMsg, setIsNewMsg] = useState(false);

  useEffect(() => {
    if (conversation) {
      setIsNewMsg(true);
    }
  }, [conversation.msgLastTime]);

  return type === "default" ? (
    <RowComponent
      styles={{ marginVertical: 10 }}
      onPress={() => {
        setIsNewMsg(false)
        navigation.navigate("MessageDetail", {
          conversation,
        });
      }}
    >
      <View>
        <AvatarComponent
          size={60}
          name=""
          photoURL={handleSelectedFromArr(
            conversation.avatar,
            user?.UserID as number
          )}
        />
        <View
          style={{
            backgroundColor: "#02fe3d",
            width: 16,
            height: 16,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: "#ffffff",
            position: "absolute",
            bottom: 2,
            right: 0,
          }}
        />
      </View>
      <SectionComponent styles={{ paddingBottom: "auto" }}>
        <TextComponent
          title
          text={handleSelectedFromArr(
            conversation.title,
            user?.UserID as number
          )}
        />
        <RowComponent>
          {conversation.msgLastSenderId === user?.UserID && (
            <TextComponent size={18} text="Bạn: " />
          )}
          <TextComponent
            size={18}
            numberOfLine={1}
            styles={{
              width: "56%",
              fontWeight:
                conversation.msgLastSenderId !== user?.UserID && isNewMsg
                  ? "bold"
                  : "normal",
            }}
            text={conversation.msgLast}
          />
          <TextComponent text={moment(conversation.msgLastTime).format("LT")} />
        </RowComponent>
      </SectionComponent>
    </RowComponent>
  ) : (
    <View style={{ alignItems: "center", marginHorizontal: 8 }}>
      <View>
        <AvatarComponent
          size={80}
          photoURL={handleSelectedFromArr(
            conversation.avatar,
            user?.UserID as number
          )}
          name=""
        />
        <View
          style={{
            backgroundColor: "#02fe3d",
            width: 18,
            height: 18,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: "#ffffff",
            position: "absolute",
            bottom: 2,
            right: 2,
          }}
        />
      </View>

      <TextComponent
        text={handleSelectedFromArr(conversation.title, user?.UserID as number)}
      />
    </View>
  );
};

export default MessageItem;
