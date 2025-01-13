import React from "react";
import { Text, View } from "react-native";
import { ContainerComponent, SectionComponent } from "../components";

const NotFound = () => {
  return (
    <ContainerComponent back>
      <SectionComponent>
        <Text>NotFound</Text>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default NotFound;
