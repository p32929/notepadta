// @ts-nocheck

export class AppUtils {
  static getInputValue() {
    var inputValue = document.getElementById("input_field")?.value;
    return inputValue;
  }

  static onInactive(ms: number, cb: () => void) {
    var wait = setTimeout(cb, ms);
    document.onmousemove =
      document.mousedown =
      document.mouseup =
      document.onkeydown =
      document.onkeyup =
      document.focus =
        function () {
          clearTimeout(wait);
          wait = setTimeout(cb, ms);
        };
  }
}
