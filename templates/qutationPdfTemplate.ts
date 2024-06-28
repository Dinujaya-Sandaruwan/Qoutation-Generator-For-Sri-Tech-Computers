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

  const nameAndQuantity = (name: string, quantity: number) => {
    return quantity === 1 ? name : `${name} (x${quantity})`;
  };

  const formatMoney = useFormatMoney();

  const formatPrice = (price: number) => {
    return formatMoney(price);
  };

  const total = buildItems.reduce((acc, item) => acc + item.itemPrice, 0);
  const toPay = total - advancedPayment;

  const generateWarranty = (itemWarranty: number, itemWarrantyType: string) => {
    if (itemWarranty === 0) {
      return "No Warranty";
    }
    if (itemWarranty === 1 && itemWarrantyType === "months") {
      return `${itemWarranty} month`;
    }
    if (itemWarranty === 1 && itemWarrantyType === "years") {
      return `${itemWarranty} year`;
    }
    return `${itemWarranty} ${itemWarrantyType}`;
  };

  const currentYear = new Date().getFullYear();

  const template = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: "Lato", sans-serif;
        box-sizing: border-box;
      }

      .container {
        padding: 10px;
      }

      .header, .details, .address, .footer {
        margin-bottom: 20px;
        
      }

      .header img {
        object-fit: cover;
        width: 100%;
      }

      .details, .footer {
        display: flex;
        justify-content: space-between;
        margin-right: 20px;
      }

      .boldText {
        font-weight: 900;
      }

      .address {
        display: flex;  
        margin-top: 10px;
      }

      .address p {
        margin: 0;
        
      }

      table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #ddd;
        margin-top: 10px;
        margin-bottom: 20px;
      }

      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }

      th {
        background-color: #000;
        color: white;
        font-weight: 700;
      }

      tr:nth-child(even) {
        background-color: #f2f2f2;
      }

      tr:hover {
        background-color: #ddd;
      }
      .totalRow {
        background-color: #000 !important;
        color: white;
        border-color: white;
        margin-top: 10px;
      }
      .totalRow td {
        border-color: #000;
      }
      .footerCopyright {
        position: fixed;
        bottom: 10px;
        width: 100%;
      }

      .footerCopyright p {
        text-align: center;
        font-size: 12px;
        color: #4d4d4d;
      }
      .semiBoldText {
        font-weight: 700;
        color: #171717;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://github.com/Dinujaya-Sandaruwan/ProjectImg/assets/88492493/159d2d23-14c6-4930-a27e-ce5d27385d01" alt="Header Image">
      </div>
      <div class="details">
        <p class="semiBoldText"><span class="boldText">Order ID:</span> ${id}</p>
        <p class="semiBoldText"><span class="boldText">Date:</span> ${date}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Product Name</th>
            <th>Warranty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${buildItems
            .map((item, index) => {
              return `
                <tr>
                  <td>${index + 1}</td>
                  <td>${nameAndQuantity(item.itemName, item.itemQuantity)}</td>
                  <td>${generateWarranty(
                    item.itemWarranty,
                    item.itemWarrantyType
                  )}</td>
                  <td>${formatPrice(item.itemPrice)}</td>
                </tr>
              `;
            })
            .join("")}
          <tr class="totalRow">
            <td colspan="2"></td>
            <td class="boldText">Advance Payment</td>
            <td class="boldText">${formatPrice(advancedPayment)}</td>
          </tr>
          <tr class="totalRow">
            <td colspan="2"></td>
            <td class="boldText">Total</td>
            <td class="boldText">${formatPrice(toPay)}</td>
          </tr>
        </tbody>
      </table>
      <div class="footer">
        <div>
          <p class="semiBoldText"><span class="boldText">Name:</span> ${customerName}</p>   
        <div class="address">
          <p><span class="boldText">Address:</span></p>
          <p class="semiBoldText">&nbsp;${addressLineOne}, ${addressLineTwo}</p>
        </div>
      </div>
        <p class="semiBoldText"><span class="boldText">Mobile No:</span> ${mobileNo}</p>
      </div>
      <div class="footerCopyright">
        <p><span class="boldText">Copyright &copy; ${currentYear} Sri Tech Computers. All rights reserved.</span></p>
      </div>


    </div>
  </body>
</html>
  `;

  return template;
};

export default qutationPdfTemplate;
