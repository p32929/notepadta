import { AppUtils } from "../Others/AppUtils";
import { Constants } from "../Others/Constants";
import { ITab } from "../Others/Models";
import { Context } from "./OvermindHelper";

export const setTabs = ({ state }: Context, tabs: Array<ITab>) => {
  state.tabs = tabs;
};

export const addTab = ({ state }: Context, value: ITab) => {
  state.tabs.push(value);
  state.currentTabIndex = state.tabs.length - 1;
};

export const setTabIndex = ({ state }: Context, value: number) => {
  state.currentTabIndex = value;
  setTimeout(() => {
    AppUtils.focusInput();
  }, 300);
};

export const setTabContent = ({ state }: Context, value: string) => {
  state.tabs[state.currentTabIndex].tabContent = value;
};

export const deleteTabIndex = ({ state }: Context) => {
  state.tabs = state.tabs.filter((item, index) => {
    return index !== state.currentTabIndex;
  });
  if (state.currentTabIndex != 0) {
    state.currentTabIndex -= 1;
  }
  if (state.tabs.length == 0) {
    state.tabs = [Constants.getStartingTab()];
  }
};

export const changeTabName = ({ state }: Context, value: string) => {
  state.tabs[state.currentTabIndex].tabName = value;
};

export const setSnackbarText = ({ state }: Context, value: string) => {
  state.snackbarText = value;
};
