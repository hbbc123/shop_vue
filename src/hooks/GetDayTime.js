export default function GetDayTime(date=new Date().valueOf(),type=0){
    var date = new Date(date);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) ;
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    if(type!=1){
        mm+=':'
    }
    switch(type){
    case 0: return YY + MM + DD +" "+hh + mm + ss;
    case 1: return hh + mm;
    }
}