export function formatDate(date, format) {

    const date_ = new Date(date);

    const year = date_.getFullYear();
    const month = ("0"+(date_.getMonth()+1)).slice(-2);
    const day = ("0"+date_.getDate()).slice(-2);

    const Hours = ("0"+date_.getHours()).slice(-2);
    const Minutes = ("0"+date_.getMinutes()).slice(-2);
    const Seconds =  ("0"+date_.getSeconds()).slice(-2);

    var temp = format;
    temp = temp.replace('YY', year); // 年
    temp = temp.replace('MM', month); // 月
    temp = temp.replace('DD', day); // 日
    temp = temp.replace('hh', Hours); 
    temp = temp.replace('mm', Minutes);
    temp = temp.replace('ss', Seconds);
    temp = temp.replace('HH', Hours); 
    temp = temp.replace('MM', Minutes);
    temp = temp.replace('SS', Seconds);


    return temp;
}