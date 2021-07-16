import moment from 'moment';

export function numberWithCommas(x: number) {
  // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function convertToNumberOrDefaultTo(n: any, defaultValue = 0): number {
  const parsedN = parseInt(n);

  if (isNaN(parsedN)) {
    return defaultValue;
  } else {
    return parsedN;
  }
}

export function capitalize(str?: string): string {
  if (!str) {
    return 'N/A';
  }
  const arr = str.split(' ');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(' ');
}

export function epochToDateString(ts?: number): string {
  if (!ts) {
    return 'N/A';
  }
  const m = moment.utc(ts * 1000);
  return m.format('llll') + ' (' + m.fromNow() + ')';
}

// The maximum page size for lists
export const PAGE_SIZE = 20;
