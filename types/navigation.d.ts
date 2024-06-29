import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  home: undefined; // add parameters if any
  profile: undefined;
  createPage01: undefined;
  createPage02: undefined;
  createPage03: { itemValue?: string; itemId?: string };
  addData: undefined;
  stockList: undefined;
  generatingQutation: { id?: string };
};

// export type RootStackParamList = {
//     createPage01: { someParam?: string }; // example with optional parameter
//     anotherPage: { id: number }; // example with a required parameter
//     // other routes...
//   };
