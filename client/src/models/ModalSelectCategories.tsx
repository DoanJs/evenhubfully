import React, { useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from "../components";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import {
  CategoriesDocument,
  EditInterestsDocument,
  GetUserIdDocument,
} from "../gql/graphql";
import { CategoryModel } from "./CategoryModel";
import { TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/gloabalStyles";
import { appColor } from "../constants/appColor";
import { userVar } from "../graphqlClient/cache";
import { LoadingModal } from "../modals";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelected: (vals: string[]) => void;
  selected?: string[];
}

const ModalSelectCategories = (props: Props) => {
  const { visible, onClose, onSelected, selected } = props;
  const user = useReactiveVar(userVar);
  const modalizeRef = useRef<Modalize>();
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const { data: data_categories } = useQuery(CategoriesDocument);
  const [catsSelected, setCatsSelected] = useState<string[]>(selected ?? []);
  const [isVisible, setIsVisible] = useState(false);
  const [editInterests] = useMutation(EditInterestsDocument, {
    refetchQueries: [
      {
        query: GetUserIdDocument,
        variables: {
          userId: user?.UserID,
        },
      },
    ],
  });

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

  const handleUpdateInterests = () => {
    const interests = catsSelected?.map((id) => {
      return { UserID: user?.UserID, CategoryID: Number(id) };
    });

    if (interests) {
      setIsVisible(true);
      editInterests({
        variables: {
          userId: user?.UserID as number,
          interests,
        },
      })
        .then(() => {
          setIsVisible(false);
          modalizeRef.current?.close();
        })
        .catch(() => {
          setIsVisible(false);
        });
    }
  };

  const onSelectedCategory = (id: string) => {
    const items = [...catsSelected];
    const index = items.findIndex((element) => element === id);
    if (index !== -1) {
      items.splice(index, 1);
      setCatsSelected(items);
    } else {
      setCatsSelected([...items, id]);
    }
  };

  return (
    <Portal>
      <Modalize
        handlePosition="inside"
        adjustToContentHeight
        ref={modalizeRef}
        onClose={onClose}
      >
        <SectionComponent styles={{ padding: 30 }}>
          <RowComponent justify="center">
            {categories.length > 0 &&
              categories.map((category) => (
                <TouchableOpacity
                  onPress={() =>
                    onSelectedCategory(category.CategoryID.toString())
                  }
                  style={[
                    globalStyles.shadow,
                    globalStyles.center,
                    {
                      padding: 12,
                      marginRight: 8,
                      marginBottom: 8,
                      backgroundColor: appColor.white,
                      borderRadius: 12,
                      minWidth: 80,
                      borderWidth: 1,
                      borderColor: catsSelected?.includes(
                        category.CategoryID.toString()
                      )
                        ? appColor.primary
                        : appColor.white,
                    },
                  ]}
                  key={category.CategoryID}
                >
                  <TextComponent text={category.label} />
                </TouchableOpacity>
              ))}
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent justify="center">
            <ButtonComponent
              type="primary"
              text="Agree"
              onPress={() => handleUpdateInterests()}
            />
          </RowComponent>
        </SectionComponent>
      </Modalize>
      <LoadingModal visible={isVisible} />
    </Portal>
  );
};

export default ModalSelectCategories;
