import { useReactiveVar } from "@apollo/client";
import React, { useState } from "react";
import {
  ContainerComponent,
  ListBillComponent,
  LoadingComponent,
} from "../../components";
import { billsVar } from "../../graphqlClient/cache";

const CartScreen = ({ route }: any) => {
  const bills = useReactiveVar(billsVar);
  const [isLoading, setIsLoading] = useState(false);
  

  return (
    <ContainerComponent back title="View Cart">
      {bills.length > 0 ? (
        <ListBillComponent items={bills} />
      ) : (
        <LoadingComponent value={bills.length} isLoading={isLoading} />
      )}
    </ContainerComponent>
  );
};

export default CartScreen;
