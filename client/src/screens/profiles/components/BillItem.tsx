import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Location } from "iconsax-react-native";
import React, { useState } from "react";
import {
  Image,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { BillModel } from "../../../models/BillModel";
import { RootStackParamList } from "../../../types/route";
import {
  CardComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../../components";
import { appInfo } from "../../../constants/appInfos";
import { appColor } from "../../../constants/appColor";
import { LoadingModal } from "../../../modals";
import { AntDesign, Feather } from "@expo/vector-icons";
import { DateTime } from "../../../utils/DateTime";

interface Props {
  item: BillModel;
  type: "card" | "list";
  styles?: StyleProp<ViewStyle>;
}
const BillItem = (props: Props) => {
  const { item, type, styles } = props;
  const navigation: any = useNavigation();
  const [isvisible, setIsvisible] = useState<boolean>(false);

  return (
    <CardComponent
      isShadow
      onPress={() => {}}
      styles={[{ width: appInfo.sizes.WIDTH * 0.7 }, styles]}
    >
      <>
        <RowComponent>
          <Image
            source={{
              uri:
                item.eventBuy.imageUrl ??
                `https://tapchibaohiemxahoi.gov.vn/media/avatars/032023/457170fb-88e5-40d6-8fd9-c94ab0c9d940.png`,
            }}
            style={{
              width: "25%",
              height: "100%",
              resizeMode: "cover",
              borderRadius: 20,
            }}
          />
          <SectionComponent styles={{ flex: 1, paddingBottom: 10 }}>
            <RowComponent>
              <TextComponent
                text={item.eventBuy.title}
                title
                size={18}
                numberOfLine={1}
                styles={{ flex: 1 }}
              />
              <Feather name="trash" size={18} color={appColor.primary} />
            </RowComponent>
            <TextComponent
              size={16}
              text={`$${item.price}`}
              color={appColor.gray}
            />
            <RowComponent>
              <AntDesign name="clockcircleo" size={12} color={appColor.text2} />
              <SpaceComponent width={6} />
              <RowComponent>
                <TextComponent
                  flex={1}
                  numberOfLine={1}
                  text={DateTime.GetStartAndEnd(
                    Date.parse(item.eventBuy.startAt),
                    Date.parse(item.eventBuy.endAt)
                  )}
                  size={12}
                  color={appColor.text3}
                />
                <RowComponent>
                  <View
                    style={{
                      padding: 4,
                      borderWidth: 1,
                      borderColor: appColor.primary,
                      borderRadius: "100%",
                    }}
                  >
                    <AntDesign
                      name="minus"
                      size={14}
                      color={appColor.primary}
                    />
                  </View>
                  <SpaceComponent width={10} />
                  <TextComponent text="1" />
                  <SpaceComponent width={10} />
                  <View
                    style={{
                      padding: 4,
                      borderWidth: 1,
                      borderColor: appColor.primary,
                      borderRadius: "100%",
                    }}
                  >
                    <AntDesign name="plus" size={14} color={appColor.primary} />
                  </View>
                </RowComponent>
              </RowComponent>
            </RowComponent>
            {item.status === "success" ? (
              <TextComponent
                text="Success"
                styles={{
                  fontStyle: "italic",
                }}
                color={appColor.green}
              />
            ) : (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PaymentScreen", { billDetail: item })
                }
              >
                <TextComponent
                  text="Đi đến thanh toán"
                  styles={{
                    fontStyle: "italic",
                  }}
                  color={appColor.primary}
                />
              </TouchableOpacity>
            )}
          </SectionComponent>
        </RowComponent>
      </>

      <LoadingModal visible={isvisible} />
    </CardComponent>
  );
};

export default BillItem;
