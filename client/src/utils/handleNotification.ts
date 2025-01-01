import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export class HandleNotification {
  static registerForPushNotificationsAsync = async () => {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        this.handleRegistrationError(
          "Permission not granted to get push token for push notification!"
        );
        return;
      }
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        this.handleRegistrationError("Project ID not found");
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        return pushTokenString;
      } catch (e: unknown) {
        this.handleRegistrationError(`${e}`);
      }
    } else {
      this.handleRegistrationError(
        "Must use physical device for push notifications"
      );
    }
  };

  static sendPushNotification = async ({
    expoPushToken,
    sound,
    title,
    body,
    data,
  }: {
    expoPushToken: string;
    sound?: string;
    title?: string;
    body?: string;
    data?: any;
  }) => {
    const message = {
      to: expoPushToken,
      sound,
      title,
      body,
      data: { data: "goes here", test: { test1: "more data" } },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  static handleRegistrationError = async (errorMessage: string) => {
    alert(errorMessage);
    throw new Error(errorMessage);
  };

  // ap dung luc test k co api cua FCM server
  static schedulePushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here", test: { test1: "more data" } },
      },
      trigger: null,
      // trigger: {
      //   type: SchedulableTriggerInputTypes.TIME_INTERVAL,
      //   seconds: 2,
      // },
    });
  };
}
