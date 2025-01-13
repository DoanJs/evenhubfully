import { useQuery } from "@apollo/client";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { ReactNode, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { appColor } from "../constants/appColor";
import { CategoriesDocument } from "../gql/graphql";
import { CategoryModel } from "../models/CategoryModel";
import { globalStyles } from "../styles/gloabalStyles";
import TagComponent from "./TagComponent";

interface Props {
  isFill?: boolean;
}

const CategoriesList = (props: Props) => {
  const { isFill } = props;
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const { data: data_categories } = useQuery(CategoriesDocument);

  useEffect(() => {
    if (data_categories) {
      setCategories(data_categories.categories as CategoryModel[]);
    }
  }, [data_categories]);

  const handleIconCategories = (key: string) => {
    let icon: ReactNode;
    switch (key) {
      case "sport":
        icon = (
          <FontAwesome5
            name="basketball-ball"
            color={isFill ? appColor.white : "#f0635a"}
            size={20}
          />
        );
        break;
      case "music":
        icon = (
          <FontAwesome5
            name="music"
            color={isFill ? appColor.white : "#f59762"}
            size={20}
          />
        );
        break;
      case "food":
        icon = (
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            color={isFill ? appColor.white : "#29d697"}
            size={20}
          />
        );
        break;

      default:
        icon = (
          <Ionicons
            name="color-palette"
            color={isFill ? appColor.white : "#46cdf8"}
            size={20}
          />
        );
        break;
    }

    return icon;
  };

  // const categories: CategoryModel[] = [
  //   {
  //     key: "sport",
  //     label: "Sports",
  //     icon: (

  //     ),
  //     color: "#f0635a",
  //   },
  //   {
  //     key: "music",
  //     label: "Music",
  //     icon: (
  // <FontAwesome5
  //   name="music"
  //   color={isFill ? appColor.white : "#f59762"}
  //   size={20}
  // />
  //     ),
  //     color: "#f59762",
  //   },
  //   {
  //     key: "food",
  //     label: "Food",
  //     icon: (
  // <MaterialCommunityIcons
  //   name="silverware-fork-knife"
  //   color={isFill ? appColor.white : "#29d697"}
  //   size={20}
  // />
  //     ),
  //     color: "#29d697",
  //   },
  //   {
  //     key: "color",
  //     label: "Color",
  //     icon: (
  // <Ionicons
  //   name="color-palette"
  //   color={isFill ? appColor.white : "#46cdf8"}
  //   size={20}
  // />
  //     ),
  //     color: "#46cdf8",
  //   },
  // ];
  return (
    <FlatList
      style={{ paddingHorizontal: 16 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      renderItem={({ item, index }) => (
        <TagComponent
          styles={[
            globalStyles.shadow,
            ,
            {
              marginRight: index === categories.length - 1 ? 28 : 12,
              minWidth: 82,
            },
          ]}
          bgColor={isFill ? item.color : appColor.white}
          label={item.label}
          icon={handleIconCategories(item.title)}
          onPress={() => {}}
          textColor={isFill ? appColor.white : appColor.text}
        />
      )}
    />
  );
};

export default CategoriesList;
