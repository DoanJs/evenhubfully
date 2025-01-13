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
import { useNavigation } from "@react-navigation/native";

interface Props {
  isFill?: boolean;
}

const CategoriesList = (props: Props) => {
  const { isFill } = props;
  const navigation: any = useNavigation();
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
          onPress={() =>
            navigation.navigate("CategoryDetail", {
              categoryId: item.CategoryID,
              title: item.label,
            })
          }
          textColor={isFill ? appColor.white : appColor.text}
        />
      )}
    />
  );
};

export default CategoriesList;
