import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ButtonComponent,
  ContainerComponent,
  ListEventComponent,
  LoadingComponent,
  RowComponent,
  SpaceComponent,
} from "../../components";
import { EventModel } from "../../models/EventModel";
import { useQuery } from "@apollo/client";
import { EventsDocument } from "../../gql/graphql";
import { SearchNormal1 } from "iconsax-react-native";
import { appColor } from "../../constants/appColor";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ExploreEvents = () => {
  const navigation: any = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<EventModel[]>([]);
  const { data: data_events } = useQuery(EventsDocument, {
    variables: { paramsInput: {} },
  });

  useEffect(() => {
    if (data_events) {
      setEvents(data_events.events as EventModel[]);
    }
  }, [data_events]);

  return (
    <ContainerComponent
      back
      title="Events"
      right={
        <RowComponent>
          <ButtonComponent
            icon={<SearchNormal1 size={20} color={appColor.text} />}
            onPress={() =>
              navigation.navigate("SearchEvents", {
                isFilter: false,
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
