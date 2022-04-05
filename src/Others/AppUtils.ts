// @ts-nocheck

export class AppUtils {
  static getInputValue() {
    var inputValue = document.getElementById("input_field")?.value;
    return inputValue;
  }

  static clearInput() {
    try {
      document.getElementById("input_field").value = "";
    } catch (e) {}
  }
}
