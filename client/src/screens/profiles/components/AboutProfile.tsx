import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { ReactNode, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  ButtonComponent,
  EventItem,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../../components";
import { appColor } from "../../../constants/appColor";
import { fontFamilies } from "../../../constants/fontFamilies";
import {
  CreateConversationDocument,
  DeleteConversationDocument,
  GetUserIdDocument,
} from "../../../gql/graphql";
import {
  followersVar,
  followingsVar,
  userVar,
} from "../../../graphqlClient/cache";
import { LoadingModal } from "../../../modals";
import { EventModel } from "../../../models/EventModel";
import { UserModel } from "../../../models/UserModel";
import CommentInput from "./CommentInput";
import ReviewItem from "./ReviewItem";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { ConversationModel } from "../../../models/ConversationModel";
import { useNavigation } from "@react-navigation/native";

interface Props {
  author: UserModel;
}
const tabs = [
  {
    key: "about",
    title: "About",
  },
  {
    key: "event",
    title: "Events",
  },
  {
    key: "review",
    title: "Reviews",
  },
];

const AboutProfile = (props: Props) => {
  const { author } = props;
  const navigation: any = useNavigation();
  const user = useReactiveVar(userVar);
  const followings = useReactiveVar(followingsVar);
  const followers = useReactiveVar(followersVar);
  const [isVisible, setIsVisible] = useState(false);
  const [tabSelected, setTabSelected] = useState("about");
  const [conversations, setConversations] = useState<ConversationModel[]>([]);
  const [editFollow] = useMutation(
    gql`
      mutation EditFollow($type: String!, $followInput: FollowInput!) {
        editFollow(type: $type, followInput: $followInput)
      }
    `,
    {
      refetchQueries: [
        {
          query: GetUserIdDocument,
          variables: {
            userId: user?.UserID,
          },
        },
      ],
    }
  );
  const [createConversation] = useMutation(CreateConversationDocument, {
    refetchQueries: [],
  });
  const [deleteConversation] = useMutation(DeleteConversationDocument, {
    refetchQueries: [],
  });

  useEffect(() => {
    setIsVisible(true);
    const getQuerySnap = async () => {
      const q = query(
        collection(db, "conversations"),
        where("creatorId", "==", user?.UserID),
        where("title", "==", author.Username)
      );
      await onSnapshot(q, (doc) => {
        if (doc.empty) {
          setConversations([]);
        } else {
          const items: any = [];
          doc.forEach((res) => {
            items.push(res.data());
          });
          setConversations(items);
        }
      });
    };

    getQuerySnap();
    setIsVisible(false);
  }, []);

  const handleFollow = (author: UserModel) => {
    setIsVisible(true);
    let type: "insert" | "delete" = "delete";
    const arrFollowing = [...followings];
    const arrFollower = [...followers];

    const index = arrFollowing.findIndex(
      (item: any) => item.UserID === author.UserID
    );
    if (index === -1) {
      arrFollowing.push(author);
      arrFollower.push(author);
      type = "insert";
    } else {
      arrFollowing.splice(index, 1);
      arrFollower.splice(index, 1);
    }

    followingsVar(arrFollowing);
    followersVar(arrFollower);
    editFollow({
      variables: {
        type,
        followInput: {
          followingId: user?.UserID,
          followerId: author?.UserID,
        },
      },
    })
      .then(() => setIsVisible(false))
      .catch((err: any) => {
        console.log(err);
        setIsVisible(false);
      });
  };

  const renderTabContent = (key: string) => {
    let content: ReactNode = <></>;
    switch (key) {
      case "about":
        content = <TextComponent text={author.about} />;
        break;
      case "event":
        content =
          author.author_events && author.author_events.length > 0 ? (
            author.author_events.map((item: EventModel) => (
              <EventItem
                item={item}
                key={item.EventID}
                type="list"
                styles={{ width: undefined, margin: 0 }}
              />
            ))
          ) : (
            <></>
          );
        break;

      default:
        content =
          author.reReviewers && author.reReviewers.length > 0 ? (
            [...author.reReviewers]
              .reverse()
              .map((review) => (
                <ReviewItem review={review} key={review.ReviewID} />
              ))
          ) : (
            <></>
          );
        break;
    }
    return content;
  };

  const handleAddConversation = () => {
    setIsVisible(true);
    const conversationInput = {
      isGroup: 0,
      avatar: author.PhotoUrl,
      title: author.Username,

      creatorId: user?.UserID,
      participantIds: [user?.UserID as number, author.UserID as number],
    };

    createConversation({
      variables: {
        conversationInput,
      },
    })
      .then(async (result: any) => {
        // can use docSnap.exists() checks if the document exists.

        const { ConversationID, title } = result?.data?.createConversation;

        const index = conversations.findIndex(
          (item) => item.creatorId === user?.UserID && item.title === title
        );
        if (index === -1) {
          await setDoc(doc(db, "conversations", `${ConversationID}`), {
            ...conversationInput,

            msgLast: null,
            msgLastTime: null,
            msgLastSenderId: null,
            createAt: Date.now(),
            updateAt: null,
            deleteAt: null,
          });
        }

        setIsVisible(false);
        navigation.navigate("MessageDetail", {
          conversation: {
            id: `${ConversationID}`,
            title: author.Username,
            creatorId: user?.UserID,
            avatar: author.PhotoUrl
          },
        });
      })
      .catch((err) => {
        setIsVisible(false);
        console.log(err);
      });
  };

  return (
    <>
      <SectionComponent styles={{ paddingBottom: 0 }}>
        <RowComponent justify="center">
          <ButtonComponent
            onPress={() => handleFollow(author)}
            type="primary"
            text={
              followings.findIndex(
                (following: any) => following.UserID === author.UserID
              ) !== -1
                ? "UnFollow"
                : "Follow"
            }
            iconFlex="left"
            icon={
              <Feather
                name={
                  followings.findIndex(
                    (following: any) => following.UserID === author.UserID
                  ) !== -1
                    ? "user-check"
                    : "user-plus"
                }
                size={22}
                color={appColor.white}
              />
            }
            styles={{ width: "50%" }}
          />
          <SpaceComponent width={10} />
          <ButtonComponent
            type="primary"
            text="Messages"
            iconFlex="left"
            textColor={appColor.primary}
            icon={
              <Ionicons
                name="chatbubble-outline"
                size={22}
                color={appColor.primary}
              />
            }
            styles={{
              width: "50%",
              backgroundColor: appColor.white,
              borderWidth: 1,
              borderColor: appColor.primary,
            }}
            onPress={() => handleAddConversation()}
          />
        </RowComponent>
      </SectionComponent>

      <SectionComponent styles={{ paddingBottom: 150 }}>
        <RowComponent justify="space-between">
          {tabs.map((item) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => setTabSelected(item.key)}
              style={{
                borderBottomWidth: 1,
                borderBottomColor:
                  tabSelected === item.key ? appColor.primary : appColor.gray,
                paddingBottom: 8,
                marginBottom: 12,
              }}
            >
              <TextComponent
                text={item.title.toLocaleUpperCase()}
                font={fontFamilies.bold}
                size={18}
                color={
                  tabSelected === item.key ? appColor.primary : appColor.gray
                }
              />
            </TouchableOpacity>
          ))}
        </RowComponent>
        {tabSelected === "review" && (
          <CommentInput author={author} user={user} type="comment" />
        )}
        {renderTabContent(tabSelected)}
      </SectionComponent>

      <LoadingModal visible={isVisible} />
    </>
  );
};

export default AboutProfile;
