import React from "react";
import { FlatList, StyleProp, ViewStyle } from "react-native";
import { BillModel } from "../models/BillModel";
import EventItem from "./EventItem";
import SectionComponent from "./SectionComponent";
import { BillItem } from "../screens";
import ButtonComponent from "./ButtonComponent";
import { View } from "react-native";

interface Props {
  items: BillModel[];
  type?: "seeAll" | "search";
  styles?: StyleProp<ViewStyle>;
}

const ListBillComponent = (props: Props) => {
  const { items, type, styles } = props;
  return (
    <SectionComponent styles={[styles]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={items}
        renderItem={({ item }) => (
          <BillItem
            item={item}
            key={item.BillID}
            type="list"
            styles={{ width: undefined }}
          />
        )}
      />

      <View
        style={{
          // position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
        }}
      >
        <ButtonComponent
          styles={{ width: undefined }}
          text="Buy now"
          type="primary"
        />
      </View>
    </SectionComponent>
  );
};

export default ListBillComponent;
