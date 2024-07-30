class createError extends Error{
    constructor(message, statuCode){
        super(message);
        this.statuCode = statuCode;
        this.status = `${statuCode}`.startsWith('4') ? message : 'error';

        Error.captureStackTrace(this, this.constructor);
    }
}

export default createError;