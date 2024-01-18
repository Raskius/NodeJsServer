export default class CustomError extends Error {

    constructor(message, code, errorText) {
        super(message)
        this.code = code;
        this.errorText = errorText;
    }

}