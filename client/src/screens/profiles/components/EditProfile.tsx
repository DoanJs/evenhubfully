import { View, Text } from "react-native";
import React from "react";
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  TagComponent,
  TextComponent,
} from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { UserModel } from "../../../models/UserModel";
import { appColor } from "../../../constants/appColor";

interface Props {
  profile: UserModel
}

const EditProfile = (props: Props) => {
  const navigation: any = useNavigation();
  const {profile } = props

  return (
    <SectionComponent>
      <RowComponent justify="center">
        <ButtonComponent
        styles={{
          width: "60%",
          backgroundColor: appColor.white,
          borderWidth: 1, borderColor: appColor.gray2
        }}
          text="Edit Profile"
          onPress={() => navigation.navigate("EditProfileScreen", {profile})}
          type="primary" textColor={appColor.primary} 
        />
      </RowComponent>
      <TextComponent text="About" title size={18} />
      <TextComponent text="asdkasdh" />

      <>
        <RowComponent>
          <TextComponent flex={1} text="Interests" title size={18} />
          <ButtonComponent text="Change" />
        </RowComponent>
        <RowComponent
          styles={{ flexWrap: "wrap", justifyContent: "flex-start" }}
        >
          {Array.from({ length: 9 }).map((item, index) => (
            <TagComponent
              bgColor="#e0e0e0"
              styles={{
                marginRight: 8,
                marginBottom: 12,
              }}
              key={index}
              label="Music"
              onPress={() => {}}
            />
          ))}
        </RowComponent>
      </>
    </SectionComponent>
  );
};

export default EditProfile;
