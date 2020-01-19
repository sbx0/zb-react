import i18N from '../i18N/i18N_zh_CN';

export default {
    // 将状态码转换成提示语句
    statusToAlert(status) {
        switch (status) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                return i18N.status[status];
            default:
                return 'Unknown Wrong';
        }
    },
    // 判断状态码
    statusToBool(status) {
        return status === 0;
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
                result += second.toFixed(0) + ' ' + i18N.date_to_time_after.second + ' ';
            }
        } else if (hours < 1) {
            const minutes = hours * 60.0;
            const minute = this.numToFixed(minutes, 0);
            hours = (minutes - minute) / 60.0;
            if (minute > 0) {
                result += minute.toFixed(0) + ' ' + i18N.date_to_time_after.minute + ' ' +
                    this.hourToBetter(hours);
            } else {
                result += minutes.toFixed(0) + ' ' + i18N.date_to_time_after.minute + ' ';
            }
        } else if (hours < 24) {
            const hour = this.numToFixed(hours, 0);
            hours = hours - hour;
            if (hour > 0) {
                result += hour.toFixed(0) + ' ' + i18N.date_to_time_after.hour + ' ' +
                    this.hourToBetter(hours);
            } else {
                result += hours.toFixed(0) + ' ' + i18N.date_to_time_after.hour + ' ';
            }
        } else if (hours < 24 * 30) {
            const days = hours / 24.0;
            const day = this.numToFixed(days, 0);
            hours = (days - day) * 24.0;
            if (day > 0) {
                result += day.toFixed(0) + ' ' + i18N.date_to_time_after.day + ' ' +
                    this.hourToBetter(hours);
            } else {
                result += days.toFixed(0) + ' ' + i18N.date_to_time_after.day + ' ';
            }
        } else if (hours < 24 * 30 * 365.0) {
            const months = hours / (24.0 * 30.0);
            const month = this.numToFixed(months, 0);
            hours = (months - month) * (24.0 * 30.0);
            if (month > 0) {
                result += month.toFixed(0) + ' ' + i18N.date_to_time_after.month + ' ' +
                    this.hourToBetter(hours);
            } else {
                result += months.toFixed(0) + ' ' + i18N.date_to_time_after.month + ' ';
            }
        } else {
            const years = hours / (24.0 * 30.0 * 365.0);
            const year = this.numToFixed(years, 0);
            hours = (years - year) * (24.0 * 30.0 * 365.0);
            if (year > 0) {
                result += year.toFixed(0) + ' ' + i18N.date_to_time_after.year + ' ' +
                    this.hourToBetter(hours);
            } else {
                result += years.toFixed(0) + ' ' + i18N.date_to_time_after.year + ' ';
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
                i18N.date_to_time_before.month +
                i18N.date_to_time_before.before;
        } else if (weekC >= 1) {
            result = parseInt(weekC.toString()) + ' ' +
                i18N.date_to_time_before.week +
                i18N.date_to_time_before.before;
        } else if (dayC >= 1) {
            result = parseInt(dayC.toString()) + ' ' +
                i18N.date_to_time_before.day +
                i18N.date_to_time_before.before;
        } else if (hourC >= 1) {
            result = parseInt(hourC.toString()) + ' ' +
                i18N.date_to_time_before.hour +
                i18N.date_to_time_before.before;
        } else if (minC >= 1) {
            result = parseInt(minC.toString()) + ' ' +
                i18N.date_to_time_before.min +
                i18N.date_to_time_before.before;
        } else {
            result = i18N.date_to_time_before.just;
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