import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TagComponent,
  TextComponent,
} from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { UserModel } from "../../../models/UserModel";
import { appColor } from "../../../constants/appColor";
import { Edit2 } from "iconsax-react-native";
import ModalSelectCategories from "../../../models/ModalSelectCategories";

interface Props {
  profile: UserModel;
}

const EditProfile = (props: Props) => {
  const navigation: any = useNavigation();
  const { profile } = props;
  const [isVisibleModalCategory, setisVisibleModalCategory] = useState(false);

  
  return (
    <SectionComponent>
      <RowComponent justify="center">
        <ButtonComponent
          styles={{
            width: "60%",
            backgroundColor: appColor.white,
            borderWidth: 1,
            borderColor: appColor.gray2,
          }}
          text="Edit Profile"
          onPress={() => navigation.navigate("EditProfileScreen", { profile })}
          type="primary"
          textColor={appColor.primary}
        />
      </RowComponent>
      <TextComponent text="About" title size={18} />
      <TextComponent text="asdkasdh" />

      <>
        <RowComponent>
          <TextComponent flex={1} text="Interests" title size={18} />
          <RowComponent onPress={() => setisVisibleModalCategory(true)}>
            <Edit2 scale={18} color={appColor.text} />
            <SpaceComponent width={8} />
            <TextComponent text="Change" />
          </RowComponent>
        </RowComponent>
        <RowComponent
          styles={{ flexWrap: "wrap", justifyContent: "flex-start" }}
        >
          {profile &&
            profile.interests?.map((item, index) => (
              <TagComponent
                bgColor={item.color}
                styles={{
                  marginRight: 8,
                  marginBottom: 12,
                }}
                key={index}
                label={item.label}
                onPress={() => {}}
              />
            ))}
        </RowComponent>
      </>
      <ModalSelectCategories
        visible={isVisibleModalCategory}
        selected={
          profile && profile.interests
            ? [...profile.interests].map((item) => {
                return `${item.CategoryID}`;
              })
            : []
        }
        onClose={() => setisVisibleModalCategory(false)}
        onSelected={(vals) => console.log(vals)}
      />
    </SectionComponent>
  );
};

export default EditProfile;
