import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft2 } from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  CardComponent,
  CategoriesList,
  EventItem,
  InputComponent,
  LoadingComponent,
  MakerCustom,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { appInfo } from "../../constants/appInfos";
import { currentLocationVar } from "../../graphqlClient/cache";
import { globalStyles } from "../../styles/gloabalStyles";
import { EventModel } from "../../models/EventModel";
import { useStatusBar } from "../../utils/useStatusBar";
import { MaterialIcons } from "@expo/vector-icons";
import { Events_NearbyDocument } from "../../gql/graphql";

const MapScreen = () => {
  useStatusBar("dark-content");
  const navigation: any = useNavigation();
  const currentLocation = useReactiveVar(currentLocationVar);
  const [events_nearby, setEvents_nearby] = useState<EventModel[]>([]);
  const { data: data_events_nearby, loading: loading_events_nearby } = useQuery(
    Events_NearbyDocument,
    {
      variables: {
        paramsInput: {
          data: {
            lat: currentLocation?.position.lat,
            long: currentLocation?.position.lng,
            distance: 1,
          },
        },
      },
    }
  );

  useEffect(() => {
    if (data_events_nearby) {
      setEvents_nearby(data_events_nearby.events_nearby as EventModel[]);
    }
  }, [data_events_nearby]);

  return (
    <View style={{ flex: 1 }}>
      {currentLocation && (
        <MapView
          style={[styles.map]}
          initialRegion={{
            latitude: currentLocation.position.lat as number,
            longitude: currentLocation.position.lng as number,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: currentLocation.position.lat as number,
            longitude: currentLocation.position.lng as number,
            latitudeDelta: 0.001,
            longitudeDelta: 0.015,
          }}
          showsUserLocation
          showsMyLocationButton={true}
          // followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          mapType="standard"
          // onPress={(val) =>
          //   handleGetAddressFromPossition({
          //     latitude: val.nativeEvent.coordinate.latitude,
          //     longitude: val.nativeEvent.coordinate.longitude,
          //   })
          // }
        >
          {events_nearby &&
            events_nearby.map((event: any) => (
              <Marker
                key={event.EventID}
                title="asd"
                description="asdas"
                coordinate={{
                  latitude: event.position.lat,
                  longitude: event.position.lng,
                }}
              >
                <MakerCustom type={event.category} />
              </Marker>
            ))}
        </MapView>
      )}

      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          padding: 20,
          paddingTop: Platform.OS === "ios" ? 50 : 20,
        }}
      >
        <RowComponent>
          <View style={{ flex: 1 }}>
            <InputComponent
              styles={{ marginBottom: 0 }}
              placeholder="Search"
              onChange={(val) => console.log(val)}
              value=""
              affix={
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Explore", { screen: "HomeScreen" })
                  }
                >
                  <ArrowLeft2 size={24} color={appColor.text} />
                </TouchableOpacity>
              }
            />
          </View>
          <SpaceComponent width={12} />
          <CardComponent
            styles={[
              globalStyles.noSpaceCard,
              { width: 56, height: 56, marginBottom: 0 },
            ]}
            color="#ffffffb3"
          >
            <MaterialIcons
              name="my-location"
              color={appColor.danger2}
              size={22}
            />
          </CardComponent>
        </RowComponent>
        <SpaceComponent height={20} />
        <CategoriesList />
      </View>
      <SectionComponent styles={{ position: "absolute", bottom: 0 }}>
        {events_nearby.length > 0 ? (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={events_nearby}
            renderItem={({ item }) => (
              <EventItem item={item} key={item.EventID} type="list" />
            )}
          />
        ) : (
          <LoadingComponent
            value={events_nearby.length}
            isLoading={loading_events_nearby}
          />
        )}
      </SectionComponent>
    </View>
  );
};

export default MapScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: appInfo.sizes.WIDTH,
    height: appInfo.sizes.HEIGHT,
    zIndex: -1,
  },
});
