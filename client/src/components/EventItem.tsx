import { useMutation, useReactiveVar } from "@apollo/client";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Location } from "iconsax-react-native";
import React, { useState } from "react";
import { Image, ImageBackground, StyleProp, ViewStyle } from "react-native";
import {
  AvatarGroup,
  CardComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from ".";
import { appColor } from "../constants/appColor";
import { appInfo } from "../constants/appInfos";
import { fontFamilies } from "../constants/fontFamilies";
import {
  EditFollowEventDocument,
  Events_NearbyDocument,
  Events_UpcomingDocument,
  UserDocument,
} from "../gql/graphql";
import {
  currentLocationVar,
  followEventsVar,
  userVar,
} from "../graphqlClient/cache";
import { LoadingModal } from "../modals";
import { EventModel } from "../models/EventModel";
import { globalStyles } from "../styles/gloabalStyles";
import { RootStackParamList } from "../types/route";
import { numberToString } from "../utils/numberToString";

interface Props {
  item: EventModel;
  type: "card" | "list";
  styles?: StyleProp<ViewStyle>;
}
const EventItem = (props: Props) => {
  const { item, type, styles } = props;
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const followEvents = useReactiveVar(followEventsVar);
  const user = useReactiveVar(userVar);
  const currentLocation = useReactiveVar(currentLocationVar);
  const [isvisible, setIsvisible] = useState<boolean>(false);
  const [editFollowEvent] = useMutation(EditFollowEventDocument, {
    refetchQueries: [
      {
        query: Events_UpcomingDocument,
      },
      {
        query: Events_NearbyDocument,
        variables: {
          paramsInput: {
            data: {
              lat: currentLocation?.position.lat,
              long: currentLocation?.position.lng,
              distance: 1,
            },
          },
        },
      },
      {
        query: UserDocument,
        variables: {
          email: user?.Email,
        },
      },
    ],
  });

  const handleFollower = () => {
    setIsvisible(true);

    const arr: any = [...followEvents];
    let type: "insert" | "delete" = "delete";

    const index = arr.findIndex(
      (event: EventModel) => event.EventID === item?.EventID
    );
    if (index === -1) {
      arr.push({ EventID: item?.EventID, __typename: "Event" });
      type = "insert";
    } else {
      arr.splice(index, 1);
    }

    followEventsVar(arr);

    editFollowEvent({
      variables: {
        type,
        followEventInput: {
          UserID: user?.UserID,
          EventID: item?.EventID,
        },
      },
    })
      .then((res) => setIsvisible(false))
      .catch((err) => {
        setIsvisible(false);
        console.log(err);
      });
  };

  return (
    <CardComponent
      isShadow
      onPress={() =>
        navigation.navigate("EventDetail", { eventId: item.EventID })
      }
      styles={[{ width: appInfo.sizes.WIDTH * 0.7 }, styles]}
    >
      {type === "card" ? (
        <>
          <ImageBackground
            style={{
              flex: 1,
              marginBottom: 12,
              padding: 10,
              height: 131,
            }}
            source={{ uri: item.imageUrl }}
            imageStyle={{
              resizeMode: "cover",
              borderRadius: 12,
            }}
          >
            <RowComponent styles={{ justifyContent: "space-between" }}>
              <CardComponent
                styles={[globalStyles.noSpaceCard]}
                color="#ffffffb3"
              >
                <TextComponent
                  font={fontFamilies.bold}
                  size={18}
                  text={
                    numberToString(new Date(item.startAt).getDate()) as string
                  }
                  color={appColor.danger2}
                />
                <TextComponent
                  font={fontFamilies.bold}
                  size={12}
                  text={appInfo.monthNames[
                    new Date(item.startAt).getMonth()
                  ].substring(0, 3)}
                  color={appColor.danger2}
                />
              </CardComponent>
              {item.author.UserID !== user?.UserID && (
                <CardComponent
                  styles={[globalStyles.noSpaceCard]}
                  color="#ffffffb3"
                  onPress={handleFollower}
                >
                  <MaterialIcons
                    name="bookmark"
                    color={
                      followEvents.findIndex(
                        (event: EventModel) => event.EventID === item.EventID
                      ) !== -1
                        ? appColor.danger2
                        : appColor.white
                    }
                    size={22}
                  />
                </CardComponent>
              )}
            </RowComponent>
          </ImageBackground>
          <TextComponent text={item.title} title size={18} numberOfLine={1} />
          <AvatarGroup users={item.users} />
          <RowComponent>
            <Location size={18} variant="Bold" color={appColor.text2} />
            <SpaceComponent width={6} />
            <TextComponent
              flex={1}
              numberOfLine={1}
              text={item.locationAddress}
              size={14}
              color={appColor.text3}
            />
          </RowComponent>
        </>
      ) : (
        <>
          <RowComponent>
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                width: "20%",
                height: "100%",
                resizeMode: "cover",
                borderRadius: 20,
              }}
            />
            <SectionComponent styles={{ flex: 1, paddingBottom: 10 }}>
              <TextComponent
                size={16}
                text={`${appInfo.daysName[
                  new Date(item.startAt).getDay()
                ].substring(0, 3)}, ${
                  appInfo.monthNames[new Date(item.startAt).getMonth()]
                } ${new Date(item.startAt).getDate()} • ${new Date(
                  item.startAt
                ).getHours()}:${new Date(item.startAt).getMinutes()}`}
                color={appColor.gray}
              />
              <TextComponent
                text={item.title}
                title
                size={18}
                numberOfLine={1}
              />
              <RowComponent>
                <Location size={18} variant="Bold" color={appColor.text2} />
                <SpaceComponent width={6} />
                <TextComponent
                  flex={1}
                  numberOfLine={1}
                  text={item.locationAddress}
                  size={14}
                  color={appColor.text3}
                />
              </RowComponent>
            </SectionComponent>
          </RowComponent>
        </>
      )}

      <LoadingModal visible={isvisible} />
    </CardComponent>
  );
};

export default EventItem;
