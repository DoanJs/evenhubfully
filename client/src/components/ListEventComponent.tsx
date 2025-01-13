import React from "react";
import { FlatList } from "react-native";
import { EventModel } from "../models/EventModel";
import EventItem from "./EventItem";
import SectionComponent from "./SectionComponent";

interface Props {
  items: EventModel[];
  type?: "seeAll" | "search";
}

const ListEventComponent = (props: Props) => {
  const { items, type } = props;
  return (
    <SectionComponent
      styles={{
        paddingBottom: type === "seeAll" ? 180 : 400,
      }}
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
      />
    </SectionComponent>
  );
};

export default ListEventComponent;
