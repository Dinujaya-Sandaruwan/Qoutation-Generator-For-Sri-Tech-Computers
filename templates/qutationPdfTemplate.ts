import useBuildData from "@/zustand/buildDataStore";
import useFormatMoney from "@/hooks/useFormatMoney";
import React from "react";

const qutationPdfTemplate = () => {
  const {
    id,
    date,
    customerName,
    buildingBudget,
    advancedPayment,
    mobileNo,
    addressLineOne,
    addressLineTwo,
    additionalNotes,
    buildItems,
  } = useBuildData();

  const nameAndQunatity = (name: string, quantity: number) => {
    if (quantity === 1) {
      return name;
    }
    return `${name} (x${quantity})`;
  };

  const formatMoney = useFormatMoney();

  const formatPrice = (price: number) => {
    return formatMoney(price);
  };

  const total = buildItems.reduce((acc, item) => acc + item.itemPrice, 0);

  const template = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <style>
      #customers {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }

      #customers td, #customers th {
        border: 1px solid #ddd;
        padding: 8px;
      }

      #customers tr:nth-child(even){background-color: #f2f2f2;}

      #customers tr:hover {background-color: #ddd;}

      #customers th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #1C1C1C;
        color: white;
      }
    </style>
  </head>
  <body>
    <h1>Qutation</h1>
    <ol>
      <li>id: ${id}</li>
      <li>date: ${date}</li>
      <li>customerName: ${customerName}</li>
      <li>buildingBudget: ${buildingBudget}</li>
      <li>advancedPayment: ${advancedPayment}</li>
      <li>mobileNo: ${mobileNo}</li>
      <li>address: ${addressLineOne}, ${addressLineTwo}</li>
      <li>additionalNotes: ${additionalNotes}</li>
    </ol>
    <h2>Items</h2>
    <table id="customers">
      <tr>
        <th>No.</th>
        <th>Product Name</th>
        <th>Warranty</th>
        <th>Price</th>
      </tr>
      ${buildItems
        .map((item, index) => {
          return `
            <tr>
              <td>${index + 1}</td>
              <td>${nameAndQunatity(item.itemName, item.itemQuantity)}</td>
              <td>${item.itemWarranty}</td>
              <td>${formatPrice(item.itemPrice)}</td>
            </tr>
          `;
        })
        .join("")}
      <tr>
        <td></td>
        <td></td>
        <td style={font-waight: "bold"}>Total</td>
        <td style={font-waight: "bold"}>${formatPrice(total)}</td>
      </tr>
    </table>
  </body>
</html>
  `;

  return template;
};

export default qutationPdfTemplate;
