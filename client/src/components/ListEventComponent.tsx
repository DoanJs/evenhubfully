import React from "react";
import { FlatList, StyleProp, ViewStyle } from "react-native";
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
      />
    </SectionComponent>
  );
};

export default ListEventComponent;
