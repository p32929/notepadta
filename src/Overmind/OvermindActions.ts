import { ITab } from "../Others/Models";
import { Context } from "./OvermindHelper";

export const increaseCounter = ({ state }: Context, value: number) => {
  state.counter += value;
};

export const addTab = ({ state }: Context, value: ITab) => {
  state.tabs.push(value);
};

export const setTabIndex = ({ state }: Context, value: number) => {
  state.currentTabIndex = value;
};

export const deleteTabIndex = ({ state }: Context) => {
  state.tabs = state.tabs.filter((item, index) => {
    return index !== state.currentTabIndex;
  });
};

export const changeTabName = ({ state }: Context, value: string) => {
  state.tabs[state.currentTabIndex].tabName = value;
};
