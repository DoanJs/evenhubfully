import { useMutation, useReactiveVar } from "@apollo/client";
import React, { useState } from "react";
import {
  AvatarComponent,
  ButtonComponent,
  ButtonImagePicker,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
} from "../../components";
import { EditUserDocument, GetUserIdDocument } from "../../gql/graphql";
import { LoadingModal } from "../../modals";
import { UserModel } from "../../models/UserModel";
import { _handleImagePicked } from "../../utils/uploadImg";
import { userVar } from "../../graphqlClient/cache";

const EditProfileScreen = ({ route, navigation }: any) => {
  const user = useReactiveVar(userVar);
  const { profile }: { profile: UserModel } = route.params;
  const [userData, setUserData] = useState({ ...profile });
  const [fileSelected, setFileSelected] = useState<any>();
  const [isVisible, setIsVisible] = useState(false);
  const [editUser] = useMutation(EditUserDocument, {
    refetchQueries: [
      {
        query: GetUserIdDocument,
        variables: {
          userId: profile.UserID,
        },
      },
    ],
  });

  const handleChangeValue = (
    key: string,
    value: string | string[] | { lat: number; lng: number }
  ) => {
    let data: any = { ...userData };
    data[`${key}`] = value;

    setUserData(data);
  };
  const handleFileSelected = (val: any) => {
    setFileSelected(val);
    handleChangeValue("PhotoUrl", val.uri);
  };
  const handleUpdateProfile = async () => {
    setIsVisible(true);

    const formData = { ...userData };
    if (fileSelected) {
      await _handleImagePicked(fileSelected)
        .then((uri) => {
          formData.PhotoUrl = uri as string;
        })
        .catch((err) => console.log("err __handleImagePicked func: ", err));
    }

    editUser({
      variables: {
        userId: profile.UserID,
        userInput: {
          Username: formData.Username,
          PhotoUrl: formData.PhotoUrl,
        },
      },
    })
      .then((data) => {
        setIsVisible(false);
        navigation.navigate("ProfileScreen");
        userVar({
          ...user,
          Username: formData.Username,
          PhotoUrl: formData.PhotoUrl,
        } as UserModel);
      })
      .catch((err) => {
        setIsVisible(false);
        console.log(err);
      });
  };

  return (
    <ContainerComponent isScroll back title={profile.Username}>
      <SectionComponent>
        <RowComponent justify="center">
          {userData.PhotoUrl || fileSelected ? (
            <AvatarComponent
              photoURL={
                userData.PhotoUrl
                  ? userData.PhotoUrl
                  : fileSelected && fileSelected.uri
              }
              name={profile.Username ?? profile.Email}
              size={120}
            />
          ) : (
            <></>
          )}
        </RowComponent>
        <SpaceComponent height={16} />
        <RowComponent justify="center">
          <ButtonImagePicker
            onSelect={(type: any, value: any) =>
              type === "url"
                ? handleChangeValue("PhotoUrl", value)
                : handleFileSelected(value)
            }
          />
        </RowComponent>

        <InputComponent
          placeholder="Username"
          allowClear
          value={userData.Username}
          onChange={(val: any) => handleChangeValue("Username", val)}
        />
      </SectionComponent>

      <RowComponent justify="center">
        <ButtonComponent
          disable={fileSelected && userData.Username === profile.Username}
          type="primary"
          text="Update"
          onPress={handleUpdateProfile}
        />
      </RowComponent>

      <LoadingModal visible={isVisible} />
    </ContainerComponent>
  );
};

export default EditProfileScreen;
