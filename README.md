# express-validation-map

Under the inspiration of these libraries [express-validation](https://www.npmjs.com/package/express-validation) and [minimalistic-js](https://www.npmjs.com/package/minimalistic-js), I have written my own library which validate data (more convenient for me) as middleware, for the framework "express.js".


## Getting Started
### Installing
```
npm install express-validation-map -S
```

## Setup
Add a middleware to the any router and throw a validationMap object into it.

**Example a part server.js file:**

```
app.route('/user/:id')
    .put(
      onValidation(updateUserValidationMap), 
      (req, res) => { 
        // Some logic
        // ...
      }
    );
    ....

```
**Example a part server.js file:**

```
const updateUserValidationMap = {
    config: {
        code: 502,
        message: "custom"
    },
    params: {
        id: {
            methods: {
                required2: methods.isRequired,
                isInteger: methods.isInteger
            },
            messages: {
                required2: isRequiredText,
                isInteger: isOnlyIntegerText
            }
        },
    },
    body: {
        firstName: {
           methods: {
              required: methods.isRequired,
              isName: methods.isName
            },
            messages: {
              required: isRequiredText,
              isName: isNameText
          }
        },
        lastName: {
            methods: {
                required: methods.isRequired,
                isName: methods.isName,
                is23: is23,
            },
            messages: {
                required: 'asdasdasdasd',
                isName: isNameText,
                is23: 'it is number 23'
            }
        },
        email: {
            methods: {
                required: methods.isRequired,
                isEmail: methods.isEmail,
            },
            messages: {
                required: isRequiredText,
                isEmail: isEmail
            }
        },
    },
};

```

Where `params`, `body` and `query` is input data and `config` need only for define own properties:  
  `code` - http status,  
  `message` - 'erros.validations`

```
const validationMap = {
    [query|params|body]: {
        [field]: {
            methods: {
                key1: anyMethod1,
                key2: anyMethod2,
                key3: anyMethod3
            },
            messages: {
                key1: messageForMethod1,
                key2: messageForMethod2,
                key3: messageForMethod3,
            }
        }
     }
 };
```

## That is all!  

**Enjoy :)**
