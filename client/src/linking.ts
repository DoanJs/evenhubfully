import * as Linking from "expo-linking";

const config = {
  screens: {
    NotFound: "*",
    EventDetail: "EventDetail/:eventId",
    Main: {
      path: "Main",
      screens: {
        HomeNavigator: {
          path: "HomeNavigator",
          screens: {
            Add: {
              path: "Add",
            },
          },
        },
      },
    },
    // Home: {
    //   path: "home",
    // },
    // Profile: {
    //   path: "profile/:id",
    //   parse: {
    //     id: (id) => `${id}`,
    //   },
    // },
    // Notifications: "notifications",
    // EventDetail: {
    //   path: "EventDetail/:eventId",
    // },
  },
};
const prefix = Linking.createURL("/");

const linking: any = {
  prefixes: [prefix, "https://app.example.com"],
  config,
};

export default linking;
