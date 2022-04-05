import { Constants } from "../Others/Constants";
import { ITab } from "../Others/Models";

export interface State {
  tabs: Array<ITab>;
  currentTabIndex: number;
  snackbarText: string;
}

export const state: State = {
  tabs: [Constants.getStartingTab()],
  currentTabIndex: 0,
  snackbarText: "",
};
