import { appInfo } from "../constants/appInfos";
import { numberToString } from "./numberToString";

export class DateTime {
  static GetTime = (num: Date) => {
    const date = new Date(num);
    return `${numberToString(date.getHours())} : ${numberToString(
      date.getMinutes()
    )}`;
  };

  static GetDate = (num: Date) => {
    const date = new Date(num);

    return `${numberToString(date.getDate())} ${
      appInfo.monthNames[date.getMonth()]
    }, ${date.getFullYear()}`;
  };

  static GetDayString = (num: number) => {
    const date = new Date(num);

    return `${appInfo.daysName[date.getDay()]}, ${
      appInfo.monthNames[date.getMonth()]
    } ${numberToString(date.getFullYear())}`;
  };

  static GetStartAndEnd = (start: number, end: number) => {
    const dateStart = new Date(start);
    const dateEnd = new Date(end);

    return `${numberToString(dateStart.getHours())}:${numberToString(
      dateStart.getMinutes()
    )}, - ${numberToString(dateEnd.getHours())} : ${numberToString(
      dateEnd.getMinutes()
    )}`;
  };

  static GetDateUpdate = (num: number) => {
    const date = new Date(num).toISOString();
    const today = new Date().toISOString();

    const strDate = date.split("T")[0].split("-");
    const strToday = today.split("T")[0].split("-");

    if (
      strDate[0] == strToday[0] &&
      strDate[1] === strToday[1] &&
      strDate[2] === strToday[2]
    ) {
      const time = new Date().getTime() - num;
      const second = time / 1000;
      const min = time / (60 * 1000);
      const hour = time / (60 * 60 * 1000);

      let timestr = "";

      if (second < 60) {
        timestr = "Vừa mới";
      } else if (min < 60) {
        timestr = `${min.toFixed(0)} phút trước`;
      } else if (hour > 0 && hour < 24) {
        timestr = `${hour.toFixed(0)} giờ trước`;
      }
      return timestr;
    } else {
      return this.GetDate(new Date(num))
      // return `${strDate[2]} thg ${strDate[1]}${
      //   strDate[0] !== strToday[0] ? ", " + strDate[0] : ","
      // } lúc ${`${date.split("T")[1].split(":")[0]}:${
      //   date.split("T")[1].split(":")[1]
      // }`}`;
    }
  };
}
