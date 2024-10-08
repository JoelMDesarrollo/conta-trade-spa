export function validateArray(list: any): boolean {
  return list instanceof Array && list.length > 0;
}
export function roundDecimals(num: number): number {
  return num && typeof num === "number" ? Math.round(num * 100) / 100 : 0;
}
export function numberWithDecimals(num: number): string {
  return num || num === 0
    ? roundDecimals(num).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "";
}
