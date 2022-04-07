// @ts-nocheck
import { Constants } from "./Constants";
import { ITab } from "./Models";

interface IValues {
  tabs: Array<ITab>;
  currentTabIndex: number;
}

const TABS = "TABS";
const dummyValues: IValues = {
  currentTabIndex: 0,
  tabs: [Constants.getStartingTab()],
};

export class AppStorage {
  static saveAllValues(values: IValues) {
    localStorage.setItem(TABS, JSON.stringify(values));
  }

  static getAllValues(): IValues {
    let tabs = localStorage.getItem(TABS);
    var values: IValues = JSON.parse(tabs ?? JSON.stringify(dummyValues));
    return values;
  }
}
