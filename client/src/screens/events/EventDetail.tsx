import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Calendar, Location } from "iconsax-react-native";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
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
  currentLocationVar,
  followEventsVar,
  followingsVar,
  userVar,
} from "../../graphqlClient/cache";
import { LoadingModal } from "../../modals";
import { EventModel } from "../../models/EventModel";
import { UserModel } from "../../models/UserModel";
import { globalStyles } from "../../styles/gloabalStyles";
import { DateTime } from "../../utils/DateTime";

const EventDetail = ({ navigation, route }: any) => {
  // const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [isvisible, setIsvisible] = useState<boolean>(false);
  const { item }: { item: EventModel } = route.params;
  const followEvents = useReactiveVar(followEventsVar);
  const followings = useReactiveVar(followingsVar);
  const user = useReactiveVar(userVar);
  const currentLocation = useReactiveVar(currentLocationVar);
  const [editFollowEvent] = useMutation(
    gql`
      mutation editFollowEvent(
        $type: String!
        $followEventInput: FollowEventInput!
      ) {
        editFollowEvent(type: $type, followEventInput: $followEventInput)
      }
    `,
    {
      refetchQueries: [
        {
          query: gql`
            query Events_upcoming {
              events_upcoming {
                EventID
                title
                description
                locationTitle
                locationAddress
                imageUrl
                price
                category
                date
                startAt
                endAt
                position {
                  lat
                  lng
                }
                followers {
                  UserID
                }
                users {
                  UserID
                  PhotoUrl
                }
              }
            }
          `,
        },
        {
          query: gql`
            query ($email: String!) {
              user(email: $email) {
                UserID
                Username
                Password
                Email
                PhotoUrl
                followEvents {
                  EventID
                }
              }
            }
          `,
          variables: {
            email: user?.Email,
          },
        },
        {
          query: gql`
            query Events_nearby($paramsInput: ParamsInput!) {
              events_nearby(paramsInput: $paramsInput) {
                EventID
                title
                description
                locationTitle
                locationAddress
                imageUrl
                price
                category
                date
                startAt
                endAt
                position {
                  lat
                  lng
                }
                followers {
                  UserID
                }
                users {
                  UserID
                  PhotoUrl
                }
              }
            }
          `,
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
    }
  );
  const [editFollowing] = useMutation(
    gql`
      mutation EditFollowing($type: String!, $followingInput: FollowingInput!) {
        editFollowing(type: $type, followingInput: $followingInput)
      }
    `,
    {
      refetchQueries: [
        {
          query: gql`
            query ($userId: Float!) {
              getUserId(userId: $userId) {
                UserID
                Email
                PhotoUrl
                followings {
                  UserID
                  PhotoUrl
                  Username
                  Email
                }
              }
            }
          `,
          variables: {
            userId: user?.UserID,
          },
        },
      ],
    }
  );

  const handleFollowEvent = () => {
    setIsvisible(true);

    const arr: any = [];
    let type: "insert" | "delete" = "delete";

    const index = followEvents.findIndex(
      (follower) => follower.EventID === item.EventID
    );
    if (index === -1) {
      arr.push({ EventID: item.EventID, __typename: "Event" });
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
          EventID: item.EventID,
        },
      },
    })
      .then((res) => setIsvisible(false))
      .catch((err) => {
        console.log(err);
        setIsvisible(false);
      });
  };

  const handleFollowing = (author: UserModel) => {
    setIsvisible(true);
    const arr = [...followings];
    let type: "insert" | "delete" = "delete";
    const index = arr.findIndex((item: any) => item.UserID === author.UserID);
    if (index === -1) {
      arr.push(author);
      type = "insert";
    } else {
      arr.splice(index, 1);
    }

    followingsVar(arr);
    editFollowing({
      variables: {
        type,
        followingInput: {
          userId: user?.UserID,
          friendId: author?.UserID,
        },
      },
    })
      .then(() => setIsvisible(false))
      .catch((err) => {
        console.log(err);
        setIsvisible(false);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: item.imageUrl }}
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
            {item.author.UserID !== user?.UserID && (
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
                    followEvents.filter(
                      (follower: any) => follower.EventID === item.EventID
                    ).length > 0
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
            {item.users.length > 0 ? (
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
                  <AvatarGroup size={36} zIndex={5} users={item.users} />
                  <TouchableOpacity
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
                text={item.title}
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
                    text={DateTime.GetDate(new Date(item.startAt))}
                    title
                  />
                  <TextComponent
                    size={14}
                    text={`${appInfo.daysName[
                      new Date(item.startAt).getDay()
                    ].substring(0, 3)}, ${DateTime.GetStartAndEnd(
                      item.startAt,
                      item.endAt
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
                  <TextComponent size={16} text={item.locationTitle} title />
                  <TextComponent
                    size={14}
                    text={item.locationAddress}
                    numberOfLine={1}
                  />
                </View>
              </RowComponent>
              <RowComponent
                styles={{ flex: 1, marginHorizontal: 10 }}
                onPress={() =>
                  navigation.navigate("Main", {
                    screen: "HomeNavigator",
                    params: {
                      screen: "Profile",
                      params: {
                        screen: "ProfileScreen",
                        params: {
                          userId: item.author.UserID,
                        },
                      },
                    },
                  })
                }
              >
                <Image
                  source={{ uri: item.author.PhotoUrl }}
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
                  <TextComponent size={16} text={item.author.Username} title />
                  <TextComponent size={14} text={item.author.Email} />
                </View>
                {user?.UserID !== item.author.UserID && (
                  <CardComponent
                    onPress={() => handleFollowing(item.author)}
                    styles={[
                      globalStyles.noSpaceCard,
                      {
                        marginVertical: 10,
                        marginHorizontal: 10,
                        width: 60,
                        height: 28,
                      },
                    ]}
                    color={appColor.gray6}
                  >
                    <TextComponent
                      text={
                        followings.findIndex(
                          (following: any) =>
                            following.UserID === item.author.UserID
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
              <TextComponent text={item.description} />
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
      <LoadingModal visible={isvisible} />
    </View>
  );
};

export default EventDetail;
