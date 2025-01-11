import {
  ApolloProvider,
  gql,
  useMutation,
  useQuery,
  useReactiveVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import * as SplashSScreen from "expo-splash-screen";
import { jwtDecode, JwtPayload } from "jwt-decode";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { UserDocument } from "./src/gql/graphql";
import client from "./src/graphqlClient";
import {
  followersVar,
  followEventsVar,
  followingsVar,
  tokenVar,
  userVar,
} from "./src/graphqlClient/cache";
import linking from "./src/linking";
import AuthNavigator from "./src/navigators/AuthNavigator";
import MainNavigator from "./src/navigators/MainNavigator";
import { SplashScreen } from "./src/screens";
import AxiosAPI from "./src/utils/auth/callapi";
import JWTManager from "./src/utils/auth/jwt";
import { HandleNotification } from "./src/utils/handleNotification";
import * as Linking from 'expo-linking'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false, //default: true
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

SplashSScreen.preventAutoHideAsync();

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const token = useReactiveVar(tokenVar);
  const user = useReactiveVar(userVar);
  const { data: Data_user } = useQuery(UserDocument, {
    variables: {
      email: user?.Email as string,
    },
    skip: !user,
  });
  const [createFCMToken] = useMutation(
    gql`
      mutation CreateFCMToken($userId: Float!, $FCMToken: String!) {
        createFCMToken(userId: $userId, FCMToken: $FCMToken)
      }
    `,
    {
      refetchQueries: [
        {
          query: UserDocument,
          variables: {
            email: user?.Email,
          },
        },
      ],
    }
  );

  const [loaded, error] = useFonts({
    AirbnbCereal_W_Bd: require("./assets/fonts/AirbnbCereal_W_Bd.otf"),
  });

  useEffect(() => {
    async function getInitialUrl() {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl) {
          console.log(initialUrl)
        }
      } catch (error) {
        console.error("Error getting initial :", error);
      }
    }

    getInitialUrl()
  }, [])

  // Khi F5 app va k di qua LoginScreen
  useEffect(() => {
    const setUser = async (user: any) => {
      await AsyncStorage.setItem("user", user ? JSON.stringify(user) : "");
      userVar(user);
      followEventsVar(user.followEvents);
      followingsVar(user.followings);
      followersVar(user.followers);
    };
    Data_user && setUser(Data_user.user);
  }, [Data_user]);

  useEffect(() => {
    HandleNotification.registerForPushNotificationsAsync()
      .then((token) => {
        checkFCMTokens(token);
      })
      .catch((error: any) => console.log(error));
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashSScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);
    checkLogin();
    return () => clearTimeout(timeout);
  }, []);

  const checkFCMTokens = async (pushToken: string | undefined) => {
    const getUser = await AsyncStorage.getItem("user");

    if (getUser && pushToken) {
      const user = JSON.parse(getUser);
      const arr = [...user.fcmTokens];
      const index = arr.findIndex((item) => item.FCMToken === pushToken);

      if (index === -1) {
        createFCMToken({
          variables: {
            userId: user.UserID,
            FCMToken: `'${pushToken}'`,
          },
          onCompleted: async (data) => {
            console.log(data);
          },
          onError: (error) => {
            console.log("error_createFCMToken: ", error);
          },
        });
      }
    }
  };

  const checkLogin = async () => {
    const tokenStorage = await AsyncStorage.getItem("accessToken");
    if (tokenStorage) {
      const decode = jwtDecode<JwtPayload & UserType>(tokenStorage);

      if (decode?.exp && decode.exp < Date.now() / 1000) {
        const refresh_token = await AsyncStorage.getItem("refreshToken");
        AxiosAPI("POST", "refresh_token", { refresh_token })
          .then(async (res) => {
            JWTManager.setToken(res.data.access_token);
            await AsyncStorage.setItem("accessToken", res.data.access_token); //Phục vụ reload app or mới vào app để check
            tokenVar(res.data.access_token);
            console.log("App-token(122): ", res.data.access_token);
          })
          .catch((err) => console.log("App-err(124): ", err));
      } else {
        tokenVar(tokenStorage);
        JWTManager.setToken(tokenStorage);
      }
    }
  };

  if (!loaded && !error) {
    return null;
  }

  return isShowSplash ? (
    <SplashScreen />
  ) : (
    <NavigationContainer linking={linking}>
      {token ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const MyApplication = () => (
  <ApolloProvider client={client}>
    <App />
    <Toast />
  </ApolloProvider>
);
export default MyApplication;
