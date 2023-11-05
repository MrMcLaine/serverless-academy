import { YearCode } from "../constants/YearCode";
import { MonthCode } from "../constants/MonthCode";
import { DayCode } from "../constants/DayCode";

export const getDateCode = (): string => {
    const now = new Date();
    const yearKey = `Y${now.getFullYear()}` as keyof typeof YearCode;
    const monthKey = now.toLocaleString('en-us', { month: 'long' }) as keyof typeof MonthCode;
    const dayKey = `D${now.getDate()}` as keyof typeof DayCode;

    console.log('yearKey', yearKey);
    console.log('monthKey', monthKey);
    console.log('dayKey', dayKey);

    const yearCode = YearCode[yearKey];
    const monthCode = MonthCode[monthKey];
    const dayCode = DayCode[dayKey];

    console.log('yearCode', yearCode);
    console.log('monthCode', monthCode);
    console.log('dayCode', dayCode);

    return `${yearCode}${monthCode}${dayCode}`;
};