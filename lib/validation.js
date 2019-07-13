const IS_REQUIRED_FIELD_TEXT = 'This field is required';
const VALIDATION_ERROR = 'validation.error';

// HELPERS
function isEmpty(obj) { // simple check
    return !obj || !Object.keys(obj).length;
}

function responseErrorValidation({ config, validations }) {
    return {
        status: config && config.code || 422,
        message: config && config.message || VALIDATION_ERROR,
        errors: validations
    }
}


const _onValidationBody = ({ data, validationMap, config }) => {
    
    // check for empty validation map
    if(!validationMap || isEmpty(validationMap)) return;

    const requestData = data || {};

    let errors = {}
    const fieldsValidation = Object.keys(validationMap);

    fieldsValidation.forEach(field => {
        const value = requestData[field];
        
        Object.keys(validationMap[field].methods).forEach(method => {
            const onRule = validationMap[field].methods[method];
            const errorText = validationMap[field].messages[method];
           
            if (!onRule(value)) {
              errors[field] = errorText;
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
        return res.json(responseErrorValidation({ config, validations: paramsErrors }));
    }

    // check queries
    const queryErrors = method === 'GET' &&  _onValidationBody({ config, data: query, validationMap: queryMap });
    if(!isEmpty(queryErrors)){
        return res.json(responseErrorValidation({ config, validations: queryErrors }));
    }

    // check body
    const bodyErrors = _onValidationBody({ config, data: isEmpty(body) ? false: JSON.parse(body), validationMap: bodyMap });
    if(!isEmpty(bodyErrors)){
        return res.json(responseErrorValidation({ config, validations: bodyErrors }));
    }
   
    next();
}



module.exports = onValidation;
