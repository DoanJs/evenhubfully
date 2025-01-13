import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Calendar, Location } from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import arrowRight from "../../assets/images/arrowRight.png";
import {
  AvatarGroup,
  ButtonComponent,
  CardComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TextComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { appInfo } from "../../constants/appInfos";
import { fontFamilies } from "../../constants/fontFamilies";
import {
  EditFollowDocument,
  EditFollowEventDocument,
  EventDocument,
  Events_NearbyDocument,
  Events_UpcomingDocument,
  GetUserIdDocument,
  UserDocument,
} from "../../gql/graphql";
import {
  currentLocationVar,
  followersVar,
  followEventsVar,
  followingsVar,
  userVar,
} from "../../graphqlClient/cache";
import { LoadingModal } from "../../modals";
import { EventModel } from "../../models/EventModel";
import ModalInvite from "../../models/ModalInvite";
import { UserModel } from "../../models/UserModel";
import { globalStyles } from "../../styles/gloabalStyles";
import { DateTime } from "../../utils/DateTime";

const EventDetail = ({ navigation, route }: any) => {
  // const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { eventId }: { eventId: number } = route.params;
  const followEvents = useReactiveVar(followEventsVar);
  const followings = useReactiveVar(followingsVar);
  const followers = useReactiveVar(followersVar);
  const user = useReactiveVar(userVar);
  const currentLocation = useReactiveVar(currentLocationVar);
  const [isVisibleModalInvite, setisVisibleModalInvite] = useState(false);
  const [editFollowEvent] = useMutation(EditFollowEventDocument, {
    refetchQueries: [
      {
        query: Events_UpcomingDocument,
      },
      {
        query: UserDocument,
        variables: {
          email: user?.Email,
        },
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
    ],
  });
  const [event, setEvent] = useState<EventModel>();
  const { data: data_event } = useQuery(EventDocument, {
    variables: {
      eventId: Number(eventId),
    },
    skip: !eventId,
  });
  

  useEffect(() => {
    if (data_event) {
      setEvent(data_event.event as EventModel);
    }
  }, [data_event]);

  const [editFollow] = useMutation(EditFollowDocument, {
    refetchQueries: [
      {
        query: GetUserIdDocument,
        variables: {
          userId: user?.UserID,
        },
      },
    ],
  });

  const handleFollowEvent = () => {
    setIsVisible(true);

    const arr: any = [...followEvents];
    let type: "insert" | "delete" = "delete";

    const index = followEvents.findIndex(
      (item: EventModel) => item.EventID === event?.EventID
    );
    if (index === -1) {
      arr.push({ EventID: event?.EventID, __typename: "Event" });
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
          EventID: event?.EventID,
        },
      },
    })
      .then((res) => setIsVisible(false))
      .catch((err) => {
        console.log(err);
        setIsVisible(false);
      });
  };

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
      .catch((err) => {
        console.log(err);
        setIsVisible(false);
      });
  };

  if (!event) return <ActivityIndicator />;
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: event.imageUrl }}
        style={{
          flex: 1,
          height: 244,
          zIndex: -1,
          backgroundColor: appColor.white,
        }}
        imageStyle={{
          resizeMode: "cover",
          height: 244,
          width: appInfo.sizes.WIDTH,
        }}
      >
        <LinearGradient colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0)"]}>
          <RowComponent
            styles={{
              paddingHorizontal: 10,
              paddingTop: 28,
            }}
          >
            <RowComponent styles={{ flex: 1, paddingVertical: 16 }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft size={24} color={appColor.white} />
              </TouchableOpacity>
              <SpaceComponent width={10} />
              <TextComponent
                flex={1}
                text="Event Details"
                title
                color={appColor.white}
              />
            </RowComponent>
            {event.author.UserID !== user?.UserID && (
              <CardComponent
                onPress={handleFollowEvent}
                styles={[
                  globalStyles.noSpaceCard,
                  {
                    marginVertical: 10,
                    marginHorizontal: 10,
                    width: 36,
                    height: 36,
                  },
                ]}
                color="#ffffff4d"
              >
                <MaterialIcons
                  name="bookmark"
                  color={
                    followEvents &&
                    followEvents.findIndex(
                      (item: EventModel) => item.EventID === event.EventID
                    ) !== -1
                      ? appColor.danger2
                      : appColor.white
                  }
                  size={22}
                />
              </CardComponent>
            )}
          </RowComponent>
        </LinearGradient>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            paddingTop: 244 - 120,
            zIndex: 1,
          }}
        >
          <SectionComponent>
            {event.users.length > 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <RowComponent
                  justify="space-between"
                  styles={[
                    globalStyles.shadow,
                    {
                      backgroundColor: appColor.white,
                      borderRadius: 100,
                      paddingHorizontal: 12,
                      width: "90%",

                      alignItems: "center",
                    },
                  ]}
                >
                  <AvatarGroup size={36} zIndex={5} users={event.users} />
                  <TouchableOpacity
                    onPress={() => setisVisibleModalInvite(true)}
                    style={[
                      globalStyles.button,
                      {
                        backgroundColor: appColor.primary,
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        minHeight: 0,
                      },
                    ]}
                  >
                    <TextComponent text="Invite" color={appColor.white} />
                  </TouchableOpacity>
                </RowComponent>
              </View>
            ) : (
              <View style={{ alignItems: "center", borderRadius: 100 }}>
                <ButtonComponent
                  onPress={() => setisVisibleModalInvite(true)}
                  styles={{ borderRadius: 100 }}
                  text="Invite"
                  type="primary"
                />
              </View>
            )}
          </SectionComponent>

          <View
            style={{
              backgroundColor: "#ffffff",
            }}
          >
            <SectionComponent>
              <TextComponent
                title
                text={event.title}
                size={34}
                font={fontFamilies.medium}
              />
            </SectionComponent>
            <SectionComponent>
              <RowComponent>
                <CardComponent
                  styles={[
                    globalStyles.noSpaceCard,
                    {
                      marginVertical: 10,
                      marginHorizontal: 10,
                      width: 48,
                      height: 48,
                    },
                  ]}
                  color={appColor.gray6}
                >
                  <Calendar color={appColor.primary} variant="Bold" size={24} />
                </CardComponent>
                <SpaceComponent width={16} />
                <View
                  style={{
                    flex: 1,
                    height: 48,
                    justifyContent: "space-around",
                  }}
                >
                  <TextComponent
                    size={16}
                    text={DateTime.GetDate(new Date(event.startAt))}
                    title
                  />
                  <TextComponent
                    size={14}
                    text={`${appInfo.daysName[
                      new Date(event.startAt).getDay()
                    ].substring(0, 3)}, ${DateTime.GetStartAndEnd(
                      event.startAt,
                      event.endAt
                    )} `}
                  />
                </View>
              </RowComponent>
              <RowComponent>
                <CardComponent
                  styles={[
                    globalStyles.noSpaceCard,
                    {
                      marginVertical: 10,
                      marginHorizontal: 10,
                      width: 48,
                      height: 48,
                    },
                  ]}
                  color={appColor.gray6}
                >
                  <Location color={appColor.primary} variant="Bold" size={24} />
                </CardComponent>
                <SpaceComponent width={16} />
                <View
                  style={{
                    flex: 1,
                    height: 48,
                    justifyContent: "space-around",
                  }}
                >
                  <TextComponent size={16} text={event.locationTitle} title />
                  <TextComponent
                    size={14}
                    text={event.locationAddress}
                    numberOfLine={1}
                  />
                </View>
              </RowComponent>
              <RowComponent
                styles={{ flex: 1, marginHorizontal: 10 }}
                onPress={() =>
                  navigation.navigate("ProfileScreen", {
                    userId: event.author.UserID,
                  })
                }
              >
                <Image
                  source={{ uri: event.author.PhotoUrl }}
                  style={{
                    resizeMode: "cover",
                    borderRadius: 12,
                    height: 48,
                    width: 48,
                  }}
                />
                <SpaceComponent width={24} />
                <View
                  style={{
                    flex: 1,
                    height: 48,
                    justifyContent: "space-around",
                  }}
                >
                  <TextComponent size={16} text={event.author.Username} title />
                  <TextComponent
                    size={14}
                    text={event.author.type ? event.author.type : "Personal"}
                  />
                </View>
                {user?.UserID !== event.author.UserID && (
                  <CardComponent
                    onPress={() => handleFollow(event.author)}
                    styles={[
                      globalStyles.noSpaceCard,
                      {
                        marginVertical: 10,
                        marginHorizontal: 10,
                        width: 70,
                        height: 28,
                      },
                    ]}
                    color={appColor.gray6}
                  >
                    <TextComponent
                      text={
                        followings.findIndex(
                          (following: any) =>
                            following.UserID === event.author.UserID
                        ) !== -1
                          ? "UnFollow"
                          : "Follow"
                      }
                      color={appColor.primary}
                      size={12}
                    />
                  </CardComponent>
                )}
              </RowComponent>
            </SectionComponent>

            <SectionComponent styles={{ marginBottom: 86 }}>
              <TabBarComponent title="About Event" />
              <TextComponent text={event.description} />
            </SectionComponent>
          </View>
        </ScrollView>
      </ImageBackground>

      <LinearGradient
        colors={["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 1)"]}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          padding: 12,
          alignItems: "center",
        }}
      >
        <ButtonComponent
          type="primary"
          text="BUY TICKET $120"
          onPress={() => alert("Buy ticket")}
          icon={<Image source={arrowRight} height={20} />}
          iconFlex="right"
        />
      </LinearGradient>
      
      <LoadingModal visible={isVisible} />

      <ModalInvite
        visible={isVisibleModalInvite}
        onClose={() => setisVisibleModalInvite(false)}
      />
    </View>
  );
};

export default EventDetail;
