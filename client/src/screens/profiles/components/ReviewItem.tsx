import React from "react";
import { Text } from "react-native";
import ReadMore from "react-native-read-more-text";
import {
  AvatarComponent,
  ListStarComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from "../../../components";
import { appColor } from "../../../constants/appColor";
import { appInfo } from "../../../constants/appInfos";
import { ReviewModel } from "../../../models/ReviewModel";

interface Props {
  review: ReviewModel;
}

const ReviewItem = (props: Props) => {
  const { review } = props;

  const _renderTruncatedFooter = (handlePress: any) => {
    return (
      <Text style={{ color: appColor.primary }} onPress={handlePress}>
        Read more
      </Text>
    );
  };

  const _renderRevealedFooter = (handlePress: any) => {
    return (
      <Text style={{ color: appColor.primary }} onPress={handlePress}>
        Show less
      </Text>
    );
  };

  return (
    <RowComponent
      styles={{
        alignItems: "flex-start",
        marginVertical: 8,
        paddingRight: 20,
      }}
    >
      <AvatarComponent
        photoURL={review.reviewer?.PhotoUrl}
        name={"Hung Js"}
        size={34}
      />

      <SectionComponent styles={{ paddingHorizontal: 10 }}>
        <RowComponent justify="space-between">
          <TextComponent title text={review.reviewer?.Username as string} />
          <TextComponent
            text={`${new Date(review.createAt).getDate()}-${
              appInfo.monthNames[new Date(review.createAt).getMonth()]
            }`.slice(0, 6)}
            color={appColor.gray7}
          />
        </RowComponent>
        <ListStarComponent selected={review.star ?? 5} onSelect={() => {}} />
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={_renderTruncatedFooter}
          renderRevealedFooter={_renderRevealedFooter}
        >
          <TextComponent text={review.text} />
        </ReadMore>
      </SectionComponent>
    </RowComponent>
  );
};

export default ReviewItem;
