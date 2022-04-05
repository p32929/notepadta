import { ITab } from "./Models";

export class Constants {
  static getStartingTab() {
    var startingTab: ITab = {
      tabName: "newtab",
      tabContent: "",
    };
    return startingTab;
  }
}
