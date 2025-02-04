import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { appColor } from "../constants/appColor";
import RowComponent from "./RowComponent";

interface Props {
  selected: number;
  onSelect: (val: number) => void;
  type?: "render" | "select";
}

const ListStarComponent = (props: Props) => {
  const { selected, onSelect, type } = props;

  return (
    <RowComponent>
      {Array.from({ length: 5 }).map((value: any, index: number) => (
        <AntDesign
          onPress={type === "select" ? () => onSelect(index + 1) : () => {}}
          name={index + 1 <= selected ? "star" : "staro"}
          size={24}
          color={appColor.yellow}
          key={index}
          style={{ marginRight: 2, marginVertical: 8 }}
        />
      ))}
    </RowComponent>
  );
};

export default ListStarComponent;
