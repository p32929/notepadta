export class AppUtils {
    static getInputValue() {
        // @ts-ignore
        var inputValue = document.getElementById('input_field')?.value
        return inputValue
    }
}