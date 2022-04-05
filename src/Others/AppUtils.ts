// @ts-nocheck

var time;

export class AppUtils {
  static getInputValue() {
    var inputValue = document.getElementById("input_field")?.value;
    return inputValue;
  }

  static onInactivity(onInactive: ()=> void) {
    function resetTimer() {
      clearTimeout(time);
      time = setTimeout(onInactive, 1000);
      // 1000 milliseconds = 1 second
    }

    window.addEventListener("load", resetTimer, true);
    var events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    events.forEach(function (name) {
      document.addEventListener(name, resetTimer, true);
    });
  }
}
