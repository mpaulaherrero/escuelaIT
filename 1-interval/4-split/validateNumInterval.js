const validateNumInterval = ( numInterval) => {
    let error='';
    if (numInterval <= 0){
        error=`Error!!! La cantidad debe ser positiva`;
    }
    return error;
}
module.exports = {validateNumInterval}
