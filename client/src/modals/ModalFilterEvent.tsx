import { useQuery } from "@apollo/client";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { ArrowRight2, Calendar } from "iconsax-react-native";
import React, { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import {
  ButtonComponent,
  ChoiceLocation,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../components";
import { appColor } from "../constants/appColor";
import { CategoriesDocument } from "../gql/graphql";
import { Position } from "../models/AddressModel";
import { CategoryModel } from "../models/CategoryModel";
import { globalStyles } from "../styles/gloabalStyles";
import { DateTime } from "../utils/DateTime";
import SliderScreen from "../screens/slider";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelected: (vals: string[]) => void;
  selected?: string[];
}

const ModalFilterEvent = (props: Props) => {
  const { visible, onClose, onSelected, selected } = props;
  const navigation: any = useNavigation();
  const modalizeRef = useRef<Modalize>();
  const [addressSelected, setAddressSelected] = useState<{
    address: string;
    position: Position;
  }>();
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [categorySelected, setCategorySelected] = useState<string[]>([]);
  const { data: data_categories } = useQuery(CategoriesDocument);
  const [isVisibleModalDate, setIsVisibleModalDate] = useState(false);
  const [dateCalendar, setDateCalendar] = useState(Date.now());
  const [dateTimeSelected, setDateTimeSelected] = useState("");
  const [priceRange, setPriceRange] = useState<{
    lowValue: number;
    highValue: number;
  }>();

  useEffect(() => {
    if (visible) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [visible]);

  useEffect(() => {
    if (data_categories) {
      setCategories(data_categories.categories as CategoryModel[]);
    }
  }, [data_categories]);

  const handleIconCategories = (key: string) => {
    let icon: ReactNode;
    switch (key) {
      case "Sports":
        icon = (
          <FontAwesome5
            name="basketball-ball"
            color={categorySelected.includes(key) ? appColor.white : "#f0635a"}
            size={30}
          />
        );
        break;
      case "Music":
        icon = (
          <FontAwesome5
            name="music"
            color={categorySelected.includes(key) ? appColor.white : "#f59762"}
            size={30}
          />
        );
        break;
      case "Food":
        icon = (
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            color={categorySelected.includes(key) ? appColor.white : "#29d697"}
            size={30}
          />
        );
        break;

      default:
        icon = (
          <Ionicons
            name="color-palette"
            color={categorySelected.includes(key) ? appColor.white : "#46cdf8"}
            size={30}
          />
        );
        break;
    }

    return icon;
  };

  const handleSelectedCategory = (id: string) => {
    const items = [...categorySelected];
    const index = items.indexOf(id);
    if (index !== -1) {
      items.splice(index, 1);
    } else {
      items.push(id);
    }

    setCategorySelected(items);
  };

  const onChangeDateTime = (event: any) => {
    const timestamp = event.nativeEvent.timestamp;
    // const result = timestamp - 86400000*1
    setDateCalendar(timestamp);
    setIsVisibleModalDate(false);
  };

  const selectedDateTime = (title: string) => {
    let key = "";
    if (title !== dateTimeSelected) {
      key = title;
    }

    setDateTimeSelected(key);
  };

  const handleCategoryArrayToString = (categorySelected: any) => {
    let result = "";
    categorySelected.map(
      (category: any, index: number) =>
        (result += `'${category}'${
          index !== categorySelected.length - 1 ? "," : ""
        }`)
    );
    return result;
  };

  const handleFilterEvent = () => {
    modalizeRef.current?.close();
    navigation.navigate("SearchEvents", {
      isFilter: true,
      data: {
        categorySelected:
          categorySelected.length > 0 &&
          handleCategoryArrayToString(categorySelected),
        dateTimeSelected,
        dateCalendar: !dateTimeSelected && dateCalendar,
        addressSelected,
        priceRange,
      },
    });
  };
  return (
    <>
      <Portal>
        <Modalize
          handlePosition="inside"
          adjustToContentHeight
          ref={modalizeRef}
          onClose={onClose}
        >
          <SectionComponent styles={{ padding: 30 }}>
            <RowComponent>
              <TextComponent text="Filter" size={24} />
            </RowComponent>
          </SectionComponent>
          {categories.length > 0 && (
            <FlatList
              style={{ marginBottom: 16 }}
              horizontal
              data={categories}
              renderItem={({ item, index }) => (
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={[
                      globalStyles.center,
                      {
                        width: 63,
                        height: 63,
                        borderRadius: 100,
                        backgroundColor: categorySelected.includes(item.label)
                          ? item.color
                          : appColor.white,
                        borderWidth: 1,
                        borderColor: item.color,
                        marginLeft: index === 0 ? 16 : 0,
                        marginRight: index === categories.length - 1 ? 0 : 16,
                      },
                    ]}
                    onPress={() => handleSelectedCategory(item.label)}
                  >
                    {handleIconCategories(item.label)}
                  </TouchableOpacity>
                  <SpaceComponent height={8} />
                  <TextComponent text={item.label} />
                </View>
              )}
            />
          )}

          <SectionComponent>
            <TextComponent title text="Date time" />
            <SpaceComponent height={10} />
            <RowComponent>
              {["Today", "Tomorrow", "This week"].map((title, index) => (
                <Fragment key={title + index}>
                  <ButtonComponent
                    onPress={() => selectedDateTime(title)}
                    text={title}
                    type="primary"
                    styles={{
                      width: "30%",
                      borderWidth: 1,
                      borderColor:
                        dateTimeSelected === title
                          ? appColor.white
                          : appColor.gray,
                    }}
                    color={
                      dateTimeSelected === title
                        ? appColor.primary
                        : appColor.white
                    }
                    textColor={
                      dateTimeSelected === title
                        ? appColor.white
                        : appColor.gray
                    }
                  />
                  {index < 2 && <SpaceComponent width={10} />}
                </Fragment>
              ))}
            </RowComponent>

            {dateTimeSelected === "" && (
              <RowComponent
                onPress={() => setIsVisibleModalDate(true)}
                styles={[
                  globalStyles.button,
                  { width: "70%", borderWidth: 1, borderColor: appColor.gray },
                ]}
              >
                <View>
                  <Calendar size={28} variant="Bold" color={appColor.primary} />
                </View>
                <SpaceComponent width={12} />
                <TextComponent
                  numberOfLine={1}
                  text={"Choose from calendar"}
                  flex={1}
                />
                <ArrowRight2 color={appColor.primary} size={22} />
              </RowComponent>
            )}
          </SectionComponent>

          <SectionComponent>
            <TextComponent title text="Location" />
            <SpaceComponent height={10} />
            <ChoiceLocation
              onSelect={(val: {
                address: string;
                position: { lat: number; lng: number };
              }) => setAddressSelected(val)}
            />
          </SectionComponent>

          <SectionComponent>
            <RowComponent justify="space-between">
              <TextComponent text="Select price range" title />
              <RowComponent>
                <TextComponent
                  text={`$${priceRange?.lowValue}`}
                  color={appColor.primary}
                />
                <TextComponent text="-" color={appColor.primary} />
                <TextComponent
                  text={`$${priceRange?.highValue}`}
                  color={appColor.primary}
                />
              </RowComponent>
            </RowComponent>

            <SliderScreen onSelected={(val) => setPriceRange(val)} />
          </SectionComponent>

          <SectionComponent>
            <RowComponent justify="center">
              <ButtonComponent
                type="primary"
                styles={{ width: "50%" }}
                onPress={() => {
                  setCategorySelected([]);
                  setDateCalendar(Date.now());
                  setDateTimeSelected("");
                }}
                color={appColor.white}
                textColor={appColor.text}
                text="Reset"
              />
              <SpaceComponent width={8} />
              <ButtonComponent
                disable={
                  categorySelected.length === 0 &&
                  dateTimeSelected === "" &&
                  DateTime.GetDate(new Date(dateCalendar)) ===
                    DateTime.GetDate(new Date()) &&
                  !addressSelected &&
                  !priceRange
                }
                type="primary"
                styles={{ width: "50%" }}
                text="Agree"
                onPress={handleFilterEvent}
              />
            </RowComponent>
          </SectionComponent>
        </Modalize>
      </Portal>

      {isVisibleModalDate && (
        <DateTimePicker
          value={new Date(dateCalendar)}
          mode={"date"}
          is24Hour={true}
          onChange={(val) => onChangeDateTime(val)}
        />
      )}
    </>
  );
};

export default ModalFilterEvent;
