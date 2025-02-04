import { useMutation } from "@apollo/client";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  AvatarComponent,
  InputComponent,
  ListStarComponent,
  RowComponent,
  SectionComponent,
} from "../../../components";
import { appColor } from "../../../constants/appColor";
import { CreateReviewDocument, GetUserIdDocument } from "../../../gql/graphql";
import { LoadingModal } from "../../../modals";
import { UserModel } from "../../../models/UserModel";

interface Props {
  type: "comment" | "reply";
  author?: UserModel;
  user?: UserModel;
}

const CommentInput = (props: Props) => {
  const { type, author, user } = props;
  const [comment, setComment] = useState("");
  const [starSelected, setStarSelected] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [createReview] = useMutation(CreateReviewDocument, {
    refetchQueries: [
      { query: GetUserIdDocument, variables: { userId: author?.UserID } },
    ],
  });

  const handleComment = async () => {
    setIsVisible(true);
    try {
      await createReview({
        variables: {
          reviewInput: {
            star: starSelected,
            text: comment,
            reviewerId: user?.UserID,
            reReviewerId: author?.UserID,
          },
        },
      });
      setIsVisible(false);
      setComment("");
      setStarSelected(0);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SectionComponent
      styles={{
        backgroundColor: appColor.gray6,
      }}
    >
      <ListStarComponent
        selected={starSelected}
        type="select"
        onSelect={(val) => setStarSelected(val)}
      />
      <RowComponent justify="space-between" styles={{ alignItems: "center" }}>
        <AvatarComponent
          name=""
          photoURL={
            user?.PhotoUrl ??
            "https://ddk.1cdn.vn/2023/05/26/image.daidoanket.vn-images-upload-nghipm-05252023-_anh-tin-25-5.jpg"
          }
        />
        <InputComponent
          onChange={(val: string) => setComment(val)}
          value={comment}
          placeholder="Write a comment ..."
          styles={{ width: "80%", marginBottom: 0 }}
        />
        <FontAwesome
          name="send"
          size={24}
          color={appColor.primary}
          onPress={handleComment}
        />
      </RowComponent>

      <LoadingModal visible={isVisible} />
    </SectionComponent>
  );
};

export default CommentInput;
