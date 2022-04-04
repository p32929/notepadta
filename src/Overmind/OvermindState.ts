import { Constants } from "../Others/Constants";
import { ITab } from "../Others/Models";

export interface State {
  tabs: Array<ITab>;
  currentTabIndex: number;
  buttonVisibilities: {
    isReloadVisible: boolean;
  };
  snackbarText: string;
}

export const state: State = {
  tabs: [Constants.startingTab],
  currentTabIndex: 0,
  buttonVisibilities: {
    isReloadVisible: false,
  },
  snackbarText: "",
};
