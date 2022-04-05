import { AppStorage } from "../Others/AppStorage";
import { AppUtils } from "../Others/AppUtils";
import { Constants } from "../Others/Constants";
import { ITab } from "../Others/Models";
import { Context } from "./OvermindHelper";

export const setTabs = ({ state }: Context, tabs: Array<ITab>) => {
  state.tabs = tabs;
};

export const addTab = ({ state }: Context, value: ITab) => {
  if (state.tabs.length > 0) {
    state.tabs[state.currentTabIndex].tabContent =
      AppUtils.getInputValue() ?? "";
  }
  AppStorage.saveAllValues(state.tabs);

  state.tabs.push(value);
  state.currentTabIndex = state.tabs.length - 1;
};

export const setTabIndex = ({ state }: Context, value: number) => {
  if (state.tabs.length > 0) {
    state.tabs[state.currentTabIndex].tabContent =
      AppUtils.getInputValue() ?? "";
  }
  AppStorage.saveAllValues(state.tabs);
  state.currentTabIndex = value;
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
    state.tabs = [Constants.startingTab];
  }
};

export const changeTabName = ({ state }: Context, value: string) => {
  state.tabs[state.currentTabIndex].tabName = value;
};

export const setSnackbarText = ({ state }: Context, value: string) => {
  state.snackbarText = value;
};
