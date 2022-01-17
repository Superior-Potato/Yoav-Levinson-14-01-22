// not-null validation
const validate = (any) => {
    return any !== undefined
     && any !== null
}
// non-empty string validation
const validateString =(string) => {
    return validate(string)
     && string.length > 0
}

export default {
    validate,
    validateString
}