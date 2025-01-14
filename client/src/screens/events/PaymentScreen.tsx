import React from "react";
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  TagComponent,
  TextComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { fontFamilies } from "../../constants/fontFamilies";
import { DateTime } from "../../utils/DateTime";
import { BillModel } from "../../models/BillModel";

const PaymentScreen = ({ route }: any) => {
  const { billDetail }: { billDetail: BillModel } = route.params;

  const handlePaySuccessfully = async () => {
    console.log(billDetail);
  };

  return (
    <ContainerComponent back title="Thanh toán" isScroll={true}>
      <SectionComponent>
        <RowComponent justify="flex-end">
          <TagComponent
            label={billDetail.status === "success" ? "Success" : "Unpaid"}
          />
        </RowComponent>
      </SectionComponent>

      <SectionComponent styles={{ alignItems: "center", marginBottom: 500 }}>
        <TextComponent
          text={`ID: ${billDetail.BillID}`}
          size={20}
          font={fontFamilies.bold}
        />
        <TextComponent
          text={`Date: ${DateTime.GetDayString(
            Date.parse(billDetail.createAt)
          )}`}
        />
        <TextComponent
          text={`$${billDetail.price}`}
          color={appColor.primary}
          size={24}
          font={fontFamilies.bold}
        />
      </SectionComponent>

      <SectionComponent
        styles={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <RowComponent justify="space-between">
          <TextComponent text="Total change" />
          <TextComponent
            font={fontFamilies.medium}
            color={appColor.primary}
            text={`$${billDetail.price}`}
          />
        </RowComponent>

        <ButtonComponent
          onPress={handlePaySuccessfully}
          text="Pay now"
          type="primary"
          styles={{ marginBottom: 10, marginVertical: 12, width: undefined }}
        />
        <TextComponent
          styles={{ textAlign: "center" }}
          text="Payment securely progressed by Paypal"
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default PaymentScreen;
