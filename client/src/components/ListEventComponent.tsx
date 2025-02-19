import React, { useCallback, useState } from "react";
import { FlatList, RefreshControl, StyleProp, ViewStyle } from "react-native";
import { EventModel } from "../models/EventModel";
import EventItem from "./EventItem";
import SectionComponent from "./SectionComponent";

interface Props {
  items: EventModel[];
  type?: "seeAll" | "search";
  styles?: StyleProp<ViewStyle>;
}

const ListEventComponent = (props: Props) => {
  const { items, type, styles } = props;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      // Simulate fetching new data
      console.log('reload...')
      setRefreshing(false)
    }, 1500);
  }, []);
  
  return (
    <SectionComponent
      styles={[
        {
          paddingBottom: type === "seeAll" ? 180 : 400,
        },
        styles,
      ]}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={items}
        renderItem={({ item }) => (
          <EventItem
            item={item}
            key={item.EventID}
            type="list"
            styles={{ width: undefined }}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SectionComponent>
  );
};

export default ListEventComponent;
