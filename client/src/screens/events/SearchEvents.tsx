import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { EventModel } from "../../models/EventModel";
import { useQuery } from "@apollo/client";
import { EventsDocument } from "../../gql/graphql";
import {
  ButtonComponent,
  ContainerComponent,
  ListEventComponent,
  LoadingComponent,
  RowComponent,
  SpaceComponent,
} from "../../components";
import { SearchNormal1 } from "iconsax-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { appColor } from "../../constants/appColor";

const SearchEvents = ({ navigation, route }: any) => {
  const { isFilter }: { isFilter: boolean } = route.params;
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
      title="Search"
      right={
        <RowComponent>
          <ButtonComponent
            icon={<SearchNormal1 size={20} color={appColor.text} />}
          />
          <SpaceComponent width={12} />
          <MaterialIcons name="more-vert" size={20} color={appColor.text} />
        </RowComponent>
      }
    >
      {events.length > 0 ? (
        <ListEventComponent items={events} />
      ) : (
        <LoadingComponent value={events.length} isLoading={isLoading} />
      )}
    </ContainerComponent>
  );
};

export default SearchEvents;
