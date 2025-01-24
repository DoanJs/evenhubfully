import { useQuery, useReactiveVar } from "@apollo/client";
import { MaterialIcons } from "@expo/vector-icons";
import { SearchNormal1 } from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import {
  ButtonComponent,
  ContainerComponent,
  ListEventComponent,
  LoadingComponent,
  RowComponent,
  SpaceComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import {
  Events_NearbyDocument,
  Events_UpcomingDocument,
  EventsDocument,
  GetEventConditionsDocument,
} from "../../gql/graphql";
import { EventModel } from "../../models/EventModel";
import { currentLocationVar } from "../../graphqlClient/cache";

const ExploreEvents = ({ route, navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const currentLocation = useReactiveVar(currentLocationVar);
  const [events, setEvents] = useState<EventModel[]>([]);
  const { data: data_getEventConditions } = useQuery(
    GetEventConditionsDocument,
    {
      variables: {
        eventConditionInput: {
          filter: {
            key: route.params.key,
            data: {
              lat: currentLocation?.position.lat,
              long: currentLocation?.position.lng,
              distance: 1,
            },
          },
        },
      },
    }
  );

  useEffect(() => {
    if (data_getEventConditions) {
      setEvents(data_getEventConditions.getEventConditions as EventModel[]);
    }
  }, [data_getEventConditions]);

  return (
    <ContainerComponent
      back
      title={route.params.title}
      right={
        <RowComponent>
          <ButtonComponent
            icon={<SearchNormal1 size={20} color={appColor.text} />}
            onPress={() =>
              navigation.navigate("SearchEvents", {
                isFilter: false,
                data: {
                  categorySelected: [],
                  dateTimeSelected: '',
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
      {events.length > 0 ? (
        <ListEventComponent type="seeAll" items={events} />
      ) : (
        <LoadingComponent value={events.length} isLoading={isLoading} />
      )}
    </ContainerComponent>
  );
};

export default ExploreEvents;
