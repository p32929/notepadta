import { ITab } from "../Others/Models";

export interface State {
  counter: number;
  tabs: Array<ITab>;
  currentTabIndex: number;
}

export const state: State = {
  counter: 0,
  tabs: [
    {
      tabName: "Tab1",
      tabContent: "some texts",
    },
  ],
  currentTabIndex: 0,
};
