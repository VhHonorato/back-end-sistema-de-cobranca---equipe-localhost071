function verificarDatas(data1, data2){
    if(data1 > data2){
        return true;
    }
    if(data1 < data2){
        return false;
    }
    return false;
}

module.exports = {verificarDatas};