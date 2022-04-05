import { ITab } from "./Models";

const TABS = "TABS";

export class AppStorage {
  static saveAllValues(tabs: Array<ITab>) {
    localStorage.setItem(TABS, JSON.stringify(tabs));
    console.log("Saved")
  }

  static getAllValues(): Array<ITab> {
    let tabs = localStorage.getItem(TABS);
    try {
      return JSON.parse(tabs ?? "[]");
    } catch (e) {
      return [];
    }
  }
}
