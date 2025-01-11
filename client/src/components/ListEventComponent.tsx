import React from "react";
import { FlatList, Text, View } from "react-native";
import { EventModel } from "../models/EventModel";
import EventItem from "./EventItem";

interface Props {
  items: EventModel[];
}

const ListEventComponent = (props: Props) => {
  const { items } = props;
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={items}
      renderItem={({ item }) => (
        <EventItem
          item={item}
          key={item.EventID}
          type="list"
          styles={{ width: undefined }}
        />
      )}
    />
  );
};

export default ListEventComponent;
