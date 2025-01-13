import { useMutation, useQuery } from "@apollo/client";
import { SearchNormal1, Sort } from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import {
  CircleComponent,
  ContainerComponent,
  ListEventComponent,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  TagComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { EventsDocument, SearchEventDocument } from "../../gql/graphql";
import { EventModel } from "../../models/EventModel";
import { debounce } from "lodash";

const SearchEvents = ({ navigation, route }: any) => {
  const { isFilter }: { isFilter: boolean } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [events, setEvents] = useState<EventModel[]>([]);
  const [results, setResults] = useState<EventModel[]>([]);
  const { data: data_events } = useQuery(EventsDocument, {
    variables: { paramsInput: {} },
  });
  const [searchEvent] = useMutation(SearchEventDocument, {
    refetchQueries: [],
  });

  useEffect(() => {
    if (!searchKey) {
      setResults(events);
    } else {
      const handleChangeSeachEvent = debounce(handleSearchEvent, 3000);
      handleSearchEvent();
    }
  }, [searchKey, events]);

  useEffect(() => {
    if (data_events) {
      setEvents(data_events.events as EventModel[]);
    }
  }, [data_events]);

  const handleSearchEvent = async () => {
    searchEvent({
      variables: {
        keySearch: searchKey,
      },
    })
      .then((results) => setResults(results.data?.searchEvent as EventModel[]))
      .catch((err) => console.log(err));
  };

  return (
    <ContainerComponent back title="Search">
      <SectionComponent>
        <RowComponent>
          <RowComponent styles={{ flex: 1 }}>
            <SearchNormal1
              variant="TwoTone"
              color={appColor.primary}
              size={20}
            />
            <View
              style={{
                width: 1,
                height: 20,
                backgroundColor: appColor.gray2,
                marginHorizontal: 10,
              }}
            />
            <TextInput
              value={searchKey}
              style={{ color: appColor.text, flex: 1 }}
              onChangeText={(val) => setSearchKey(val)}
              placeholder="Search..."
            />
          </RowComponent>

          <TagComponent
            bgColor="#5d56f3"
            label="Fillters"
            icon={
              <CircleComponent size={20} color={appColor.white}>
                <Sort size={16} color={appColor.primary} />
              </CircleComponent>
            }
            onPress={() =>
              navigation.navigate("SearchEvents", {
                isFilter: true,
              })
            }
          />
        </RowComponent>
      </SectionComponent>
      {results.length > 0 ? (
        <ListEventComponent items={results} />
      ) : (
        <LoadingComponent value={results.length} isLoading={isLoading} />
      )}
    </ContainerComponent>
  );
};

export default SearchEvents;
