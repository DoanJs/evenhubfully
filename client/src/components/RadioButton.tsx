import React from "react";
import { Platform } from "react-native";
import { appColor } from "../constants/appColor";
import { SelectModel } from "../models/SelectModel";
import ButtonComponent from "./ButtonComponent";
import RowComponent from "./RowComponent";
import SectionComponent from "./SectionComponent";

interface Props {
  selected?: string;
  onSelect: (id: string) => void;
  data: SelectModel[];
}

const RadioButton = (props: Props) => {
  const { selected, onSelect, data } = props;
  return (
    <SectionComponent>
      <RowComponent
        justify="space-between"
        styles={{
          backgroundColor: "#f7f7f7",
          borderRadius: 100,
          padding: 4,
        }}
      >
        {data.map((item, index) => (
          <ButtonComponent
            onPress={() => onSelect(item.value)}
            key={index}
            text={item.label.toUpperCase()}
            type="primary"
            color={
              selected && selected === item.value ? appColor.white : "#f7f7f7"
            }
            textColor={
              selected && selected === item.value ? appColor.primary : "#9b9b9b"
            }
            styles={[
              {
                width: "50%",
                borderRadius: 100,
                height: 56,
                marginBottom: 0,
                shadowColor:
                  selected && selected === item.value
                    ? Platform.OS === "ios"
                      ? "rgba(0,0,0,0.3)"
                      : "rgba(0,0,0,0.5)"
                    : "#f7f7f7",
              },
            ]}
          />
        ))}
      </RowComponent>
    </SectionComponent>
  );
};

export default RadioButton;
