import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  ContainerComponent,
  ListEventComponent,
  LoadingComponent,
  SectionComponent,
  TextComponent,
} from "../../components";
import { GetEventConditionsDocument } from "../../gql/graphql";
import { EventModel } from "../../models/EventModel";

const CategoryDetail = ({ route }: any) => {
  const { categoryId, title }: { categoryId: number; title: string } =
    route.params;
    const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<EventModel[]>([]);
  const { data: data_getEventConditions } = useQuery(
    GetEventConditionsDocument,
    {
      variables: {
        condition: `category = '${title}'`,
      },
    }
  );

  useEffect(() => {
    if (data_getEventConditions) {
      setEvents(data_getEventConditions.getEventConditions as EventModel[]);
    }
  }, [data_getEventConditions]);
  return (
    <ContainerComponent back isScroll={false} title={title}>
      {events.length > 0 ? (
        <ListEventComponent items={events} styles={{ paddingBottom: 180 }} />
      ) : <LoadingComponent value={events.length} isLoading={isLoading} />}
    </ContainerComponent>
  );
};

export default CategoryDetail;
