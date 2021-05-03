class CustomException extends Error {
    constructor(statusCode, message) {
        super(message)

        // assign the error class name in your custom error (as a shortcut)
        this.name = 'CustomException'

        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);

        this.status = statusCode;
    }

    status;
}

export { CustomException };