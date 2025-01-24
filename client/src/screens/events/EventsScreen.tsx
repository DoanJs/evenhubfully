import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Platform, Text, View } from "react-native";
import { useStatusBar } from "../../utils/useStatusBar";
import {
  ButtonComponent,
  ContainerComponent,
  EventItem,
  ListEventComponent,
  LoadingComponent,
  RadioButton,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../components";
import { useQuery } from "@apollo/client";
import { EventsDocument, GetEventConditionsDocument } from "../../gql/graphql";
import { EventModel } from "../../models/EventModel";
import { globalStyles } from "../../styles/gloabalStyles";
import CalendarEmpty from "../../assets/images/calendar.png";
import { appColor } from "../../constants/appColor";
import { SearchNormal1 } from "iconsax-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import arrownRight from "../../assets/images/arrowRight.png";
import { LoadingModal } from "../../modals";
import arrowRight from "../../assets/images/arrowRight.png";
import { LinearGradient } from "expo-linear-gradient";

const EventsScreen = () => {
  useStatusBar("dark-content");
  const route = useRoute();
  const navigation: any = useNavigation();
  const [selected, setSelected] = useState("upcoming");
  const [isVisible, setIsVisible] = useState(false);
  const [events, setEvents] = useState<EventModel[]>([]);

  const { data: data_getEventConditons } = useQuery(
    GetEventConditionsDocument,
    {
      variables: {
        eventConditionInput: {
          filter: {
            key: selected,
          },
        },
      },
    }
  );

  useEffect(() => {
    if (data_getEventConditons) {
      setEvents(data_getEventConditons.getEventConditions as EventModel[]);
    }
  }, [data_getEventConditons]);

  const handleSelectedEvent = async (val: string) => {
    setIsVisible(true);
    await setSelected(val);
    setIsVisible(false);
  };
  return (
    <>
      <ContainerComponent
        right={
          <RowComponent>
            <ButtonComponent
              icon={<SearchNormal1 size={20} color={appColor.text} />}
              onPress={() =>
                navigation.navigate("SearchEvents", {
                  isFilter: false,
                  data: {
                    categorySelected: [],
                    dateTimeSelected: "",
                    dateCalendar: false,
                  },
                })
              }
            />
            <SpaceComponent width={12} />
            <MaterialIcons name="more-vert" size={20} color={appColor.text} />
          </RowComponent>
        }
      >
        <RadioButton
          data={[
            {
              label: "Upcoming",
              value: "upcoming",
            },
            {
              label: "Past event",
              value: "pastevent",
            },
          ]}
          onSelect={(val) => handleSelectedEvent(val)}
          selected={selected}
        />
        <SectionComponent
          styles={[
            {
              paddingBottom: Platform.OS === "android" ? 600 : 550,
            },
          ]}
        >
          <FlatList
            ListFooterComponent={
              events.length === 0 ? (
                <SectionComponent>
                  <ButtonComponent
                    text="Explore Events"
                    type="primary"
                    styles={{ width: undefined }}
                    iconFlex="right"
                    icon={<Image source={arrownRight} height={20} />}
                    onPress={() =>
                      navigation.navigate("ExploreEvents", {
                        key: "events",
                        title: "Events",
                      })
                    }
                  />
                </SectionComponent>
              ) : (
                <></>
              )
            }
            ListEmptyComponent={
              <View style={{ flex: 1, justifyContent: "center" }}>
                <SectionComponent styles={[globalStyles.center]}>
                  <Image
                    source={CalendarEmpty}
                    style={{ height: 202, width: 202 }}
                  />
                  <TextComponent
                    text="No Upcoming Event"
                    title
                    size={24}
                    styles={{ marginVertical: 12 }}
                  />
                  <View style={{ width: "60%" }}>
                    <TextComponent
                      styles={{ textAlign: "center" }}
                      text="Lorem ipsum dolor sit amet, consectetur"
                      size={16}
                      color={appColor.gray}
                    />
                  </View>
                </SectionComponent>
              </View>
            }
            showsVerticalScrollIndicator={false}
            data={events}
            renderItem={({ item }) => (
              <EventItem
                item={item}
                key={item.EventID}
                type="list"
                styles={{ width: undefined }}
              />
            )}
          />
        </SectionComponent>

        <LoadingModal visible={isVisible} />
      </ContainerComponent>

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
          onPress={() =>
            navigation.navigate("ExploreEvents", {
              filter: {
                key: "",
              },
              title: "Events",
            })
          }
          type="primary"
          text="EXPLORE EVENTS"
          iconFlex="right"
          icon={<Image source={arrowRight} height={20} />}
          styles={{
            backgroundColor: appColor.primary,
            width: undefined,
          }}
        />
      </LinearGradient>
    </>
  );
};

export default EventsScreen;
