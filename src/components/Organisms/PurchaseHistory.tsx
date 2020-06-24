import React from "react";
import { IProfileResponse } from "@src/data/profile";
import { TableSubtle } from "@src/components/Molecules/Table";
import { useDate } from "@src/hooks/useDate";
import { Environment } from "@src/utils/environment";

export const PurchaseHistory = ({ purchases }: IProps) => {
  if (!purchases.length) {
    return <p>No purchases</p>;
  }

  return (
    <TableSubtle>
      <thead>
        <tr>
          <th>Date</th>
          <th>Purchase</th>
          <th>Cost</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {purchases.map((purchase) => (
          <Row purchase={purchase} />
        ))}
      </tbody>
    </TableSubtle>
  );
};

const Row = ({ purchase }: { purchase: IProfileResponse["purchases"][0] }) => {
  const datetime = useDate(new Date(purchase.datetime));

  return (
    <tr key={purchase.id}>
      <td>{datetime}</td>
      <td>{purchase.product}</td>
      <td>{purchase.total}</td>
      <td>
        <a href={`${Environment.clientApiHostname}/purchases/${purchase.id}`} target="_blank">
          Receipt
        </a>
      </td>
    </tr>
  );
};

interface IProps {
  purchases: IProfileResponse["purchases"];
}
