const IS_REQUIRED_FIELD_TEXT = 'This field is required';
const VALIDATION_ERROR = 'validation.error';

// very simple check
function isEmpty(obj) { 
    return !obj || !Object.keys(obj).length;
}

function responseErrorsValidation({ res, config, validations }) {
    const settings = { 
        code: config && config.code || 422, 
        message: config && config.message || VALIDATION_ERROR,
    };

    res.status(settings.code).send({
            status: settings.code,
            message: settings.message,
            errors: validations
    });
}


const _onValidationBody = ({ data, validationMap, config }) => {
    
    // check for empty validation map
    if(!validationMap || isEmpty(validationMap)) return;

    const requestData = data || {};

    let errors = {}
    const fieldsValidation = Object.keys(validationMap);

    fieldsValidation.forEach(keyField => {
        const value = requestData[keyField];
        const field = validationMap[keyField];
        
        const methods = field && field.methods || false;
        const messages = field && field.messages || false;

        if(!methods) return console.error(`Methods in ${keyField} - is not found...`);
        if(!messages) return console.error(`Messages in ${keyField} - is not found...`);

        Object.keys(methods).forEach(method => {
            const onRule = field.methods[method];
            if(typeof(onRule) !== 'function') return console.error(`Method ${method} in ${keyField} - is not a function...`);
        
            const errorText = field.messages[method];
            if(errorText === undefined) return console.error(`Message ${method} in ${keyField} - is not describe...`);

            if (!onRule(value)) {
              errors[keyField] = Array.isArray(errors[keyField]) ? [ ...errors[keyField], errorText] : [ errorText ];
            }
        });
    });

    return errors;
}



const onValidation =  (validationMap) => async (req, res, next)=> {
    const { body, query, params, method } = req;

    const { params: paramsMap, query: queryMap, body: bodyMap, config } = validationMap;


    // check params
    const paramsErrors = _onValidationBody({ config, data: params, validationMap: paramsMap });
    if(!isEmpty(paramsErrors)){
        return responseErrorsValidation({ res, config, validations: paramsErrors });
    }

    // check queries
    const queryErrors = method === 'GET' &&  _onValidationBody({ config, data: query, validationMap: queryMap });
    if(!isEmpty(queryErrors)){
        return responseErrorsValidation({ res, config, validations: queryErrors });
    }

    // check body
    const bodyErrors = _onValidationBody({ config, data: isEmpty(body) ? false: body, validationMap: bodyMap });
    if(!isEmpty(bodyErrors)){
        return responseErrorsValidation({ res, config, validations: bodyErrors });
    }
   
    next();
}



module.exports = onValidation;
