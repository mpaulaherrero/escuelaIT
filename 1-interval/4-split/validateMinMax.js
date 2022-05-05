const validateMinMax = (min, max) => {
    let error='';
    if (max < min){
         error=`Error!!! El máximo debe ser superior o igual al mínimo`;
    }
    return error;
}
module.exports = {validateMinMax}