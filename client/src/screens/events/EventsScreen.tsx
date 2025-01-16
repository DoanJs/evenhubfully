import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useStatusBar } from "../../utils/useStatusBar";
import {
  ContainerComponent,
  ListEventComponent,
  LoadingComponent,
  TextComponent,
} from "../../components";
import { useQuery } from "@apollo/client";
import { EventsDocument } from "../../gql/graphql";
import { EventModel } from "../../models/EventModel";

const EventsScreen = () => {
  const route = useRoute();
  useStatusBar("dark-content");
  const [events, setEvents] = useState<EventModel[]>([]);
  const { data: data_events, loading: loading_events } = useQuery(
    EventsDocument,
    {
      variables: { paramsInput: {} },
    }
  );

  useEffect(() => {
    if (data_events) {
      setEvents(data_events.events as EventModel[]);
    }
  }, [data_events]);
  return (
    <ContainerComponent back title="Events">
      {events.length > 0 ? (
        <ListEventComponent items={events} type="seeAll"/>
      ) : (
        <LoadingComponent value={events.length} isLoading={loading_events} />
      )}
    </ContainerComponent>
  );
};

export default EventsScreen;
