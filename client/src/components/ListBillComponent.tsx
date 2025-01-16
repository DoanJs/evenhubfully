import React from "react";
import { FlatList, StyleProp, ViewStyle } from "react-native";
import { BillModel } from "../models/BillModel";
import { BillItem } from "../screens";
import SectionComponent from "./SectionComponent";

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
    </SectionComponent>
  );
};

export default ListBillComponent;
