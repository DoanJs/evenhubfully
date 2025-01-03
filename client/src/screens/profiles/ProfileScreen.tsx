import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import {
  AvatarComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { userVar } from "../../graphqlClient/cache";
import { UserModel } from "../../models/UserModel";
import { globalStyles } from "../../styles/gloabalStyles";
import AboutProfile from "./components/AboutProfile";
import EditProfile from "./components/EditProfile";
import { GetUserIdDocument } from "../../gql/graphql";

const ProfileScreen = ({ route }: any) => {
  const userAsync = useReactiveVar(userVar);
  const userId = route.params?.userId ?? userAsync?.UserID;
  const [user, setUser] = useState<UserModel>();
  const { data: data_user } = useQuery(GetUserIdDocument, {
    variables: {
      userId,
    },
    skip: !userId,
  });

  useEffect(() => {
    data_user && setUser(data_user.getUserId as UserModel);
  }, [data_user]);

  return (
    <ContainerComponent back title="Profile">
      {user ? (
        <>
          <SectionComponent styles={globalStyles.center}>
            <RowComponent styles={globalStyles.center}>
              <AvatarComponent
                photoURL={user.PhotoUrl}
                name={user.Username ?? user.Email}
                size={120}
              />
            </RowComponent>
            <SpaceComponent height={16} />
            <TextComponent size={24} text={user.Username ?? user.Email} />
            <SpaceComponent height={16} />
            <RowComponent>
              <View style={[globalStyles.center, { flex: 1 }]}>
                <TextComponent
                  title
                  text={`${user.followings?.length}`}
                  size={20}
                />
                <TextComponent text="Following" />
              </View>
              <View
                style={{
                  width: 1,
                  height: 30,
                  backgroundColor: appColor.gray2,
                  marginHorizontal: 10,
                }}
              />
              <View style={[globalStyles.center, { flex: 1 }]}>
                <TextComponent
                  title
                  text={`${user.followers?.length}`}
                  size={20}
                />
                <TextComponent text="Followers" />
              </View>
            </RowComponent>
          </SectionComponent>

          {route.params?.userId &&
          userAsync?.UserID !== route.params?.userId ? (
            <AboutProfile />
          ) : (
            <EditProfile profile={user} />
          )}
        </>
      ) : (
        <ActivityIndicator />
      )}
    </ContainerComponent>
  );
};

export default ProfileScreen;
