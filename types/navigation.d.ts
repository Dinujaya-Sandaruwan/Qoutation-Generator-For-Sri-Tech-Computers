import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  home: undefined; // add parameters if any
  profile: undefined;
  createPage01: undefined;
  createPage02: undefined;
  createPage03: { value?: string };
  addData: undefined;
};

// export type RootStackParamList = {
//     createPage01: { someParam?: string }; // example with optional parameter
//     anotherPage: { id: number }; // example with a required parameter
//     // other routes...
//   };
