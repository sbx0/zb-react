const date_to_time_after = {
    already: '已',
    just: '刚刚',
    over: '结束',
    there_are_still: '还有',
    month: '个月',
    week: '周',
    day: '天',
    hour: '小时',
    min: '分钟',
};

const date_to_time_before = {
    just: '刚刚',
    before: '前',
    month: '个月',
    week: '周',
    day: '天',
    hour: '小时',
    min: '分钟',
};

Date.prototype.format = function format(fmt) {
    let o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (const k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

export default {
    // 判断是否为晚上
    isNight() {
        let date = new Date();
        let time = date.format("hh");
        return !(time > 7 && time < 18);
    },
    // 创建cache时间标签
    cacheTimeStamp(minute) {
        let date = new Date();
        let timeStamp = date.format("yyyyMMdd");
        return timeStamp;
    },
    // 规格化小数
    numToFixed(x, num) {
        let clip;
        if (num !== 0) {
            clip = x.toFixed(num + 3).slice(0, -3);
        } else {
            clip = x.toFixed(num + 3).slice(0, -4);
        }
        return parseFloat(clip);
    },
    // 更好的显示时间
    hourToBetter(h) {
        if (h === undefined) h = 0.0;
        let hours = parseFloat(h);
        let result = '';
        if (hours <= 0.0169) {
            const second = this.numToFixed((hours * 60.0 * 60.0), 0);
            if (second > 0) {
                result += second.toFixed(0) + ' ' + date_to_time_after.second + ' ';
            }
        } else if (hours < 1) {
            const minutes = hours * 60.0;
            const minute = this.numToFixed(minutes, 0);
            hours = (minutes - minute) / 60.0;
            if (minute > 0) {
                result += minute.toFixed(0) + ' ' + date_to_time_after.minute + ' ' +
                    this.hourToBetter(hours);
            } else {
                result += minutes.toFixed(0) + ' ' + date_to_time_after.minute + ' ';
            }
        } else if (hours < 24) {
            const hour = this.numToFixed(hours, 0);
            hours = hours - hour;
            if (hour > 0) {
                result += hour.toFixed(0) + ' ' + date_to_time_after.hour + ' ' +
                    this.hourToBetter(hours);
            } else {
                result += hours.toFixed(0) + ' ' + date_to_time_after.hour + ' ';
            }
        } else if (hours < 24 * 30) {
            const days = hours / 24.0;
            const day = this.numToFixed(days, 0);
            hours = (days - day) * 24.0;
            if (day > 0) {
                result += day.toFixed(0) + ' ' + date_to_time_after.day + ' ' +
                    this.hourToBetter(hours);
            } else {
                result += days.toFixed(0) + ' ' + date_to_time_after.day + ' ';
            }
        } else if (hours < 24 * 30 * 365.0) {
            const months = hours / (24.0 * 30.0);
            const month = this.numToFixed(months, 0);
            hours = (months - month) * (24.0 * 30.0);
            if (month > 0) {
                result += month.toFixed(0) + ' ' + date_to_time_after.month + ' ' +
                    this.hourToBetter(hours);
            } else {
                result += months.toFixed(0) + ' ' + date_to_time_after.month + ' ';
            }
        } else {
            const years = hours / (24.0 * 30.0 * 365.0);
            const year = this.numToFixed(years, 0);
            hours = (years - year) * (24.0 * 30.0 * 365.0);
            if (year > 0) {
                result += year.toFixed(0) + ' ' + date_to_time_after.year + ' ' +
                    this.hourToBetter(hours);
            } else {
                result += years.toFixed(0) + ' ' + date_to_time_after.year + ' ';
            }
        }
        return result;
    },
    // 更好的显示时间
    timeShow(dateStr) {
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const month = day * 30;
        const dateTimeStamp = Date.parse(dateStr.toString().replace(/-/gi, '/'));
        const now = new Date().getTime();
        const diffValue = now - dateTimeStamp;
        if (diffValue < 0) {
            return dateStr;
        }
        const monthC = diffValue / month;
        const weekC = diffValue / (7 * day);
        const dayC = diffValue / day;
        const hourC = diffValue / hour;
        const minC = diffValue / minute;
        let result;
        if (monthC >= 1) {
            result = parseInt(monthC.toString()) + ' ' +
                date_to_time_before.month +
                date_to_time_before.before;
        } else if (weekC >= 1) {
            result = parseInt(weekC.toString()) + ' ' +
                date_to_time_before.week +
                date_to_time_before.before;
        } else if (dayC >= 1) {
            result = parseInt(dayC.toString()) + ' ' +
                date_to_time_before.day +
                date_to_time_before.before;
        } else if (hourC >= 1) {
            result = parseInt(hourC.toString()) + ' ' +
                date_to_time_before.hour +
                date_to_time_before.before;
        } else if (minC >= 1) {
            result = parseInt(minC.toString()) + ' ' +
                date_to_time_before.min +
                date_to_time_before.before;
        } else {
            result = date_to_time_before.just;
        }
        return result;
    },
    filling(num, length) {
        return (Array(length).join('0') + num).slice(-length);
    },
    // 计算日期差
    DateMinus() {
        const sdate = new Date(arguments[0].replace(/-/g, '/'));
        let edate;
        if (arguments.length === 1) edate = new Date();
        else if (arguments.length === 2) {
            edate = new Date(
                arguments[1].replace(/-/g, '/'));
        }
        return this.numToFixed((sdate.getTime() - edate.getTime()) / (1000 * 60 * 60), 5);
    },
};