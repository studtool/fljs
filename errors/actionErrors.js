export class NoActionNameError extends Error {
    constructor() {
        super();
        this.name = 'NoActionNameError';
        this.message = 'Name of action was not passed to ActionCreator.create().';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, PasswordMatchError);
        } else {
            this.stack = (new Error()).stack;
        }
    }
}

export class NoActionBodyError extends Error {
    constructor() {
        super();
        this.name = 'NoActionBodyError';
        this.message = 'Action with data cannot be created if it does not have body.';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, PasswordMatchError);
        } else {
            this.stack = (new Error()).stack;
        }
    }
}
