import { ITab } from "./Models";

interface IValues {
  tabs: Array<ITab>;
  currentTabIndex: number;
}

const TABS = "TABS";

export class AppStorage {
  static saveAllValues(values: IValues) {
    localStorage.setItem(TABS, JSON.stringify(values));
  }

  static getAllValues(): IValues {
    let tabs = localStorage.getItem(TABS);
    try {
      return JSON.parse(tabs ?? "----");
    } catch (e) {
      return {
        currentTabIndex: 0,
        tabs: [],
      };
    }
  }
}
