export function getHashParams() {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);

  while (e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

export function getUrlParams() {
  const vars = {};
  const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    vars[key] = value;
  });
  return vars;
}

export function removeHashParams(value) {
  if (typeof value !== 'string') return '';
  const split = value.split('#');
  return split[0];
}

export function minsSince(date1, date2) {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 60));
}

export function hoursSince(date1, date2) {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 60 * 60));
}

export function formatTime(mins) {
  const MINS_IN_DAY = 1440;

  if (mins < 60) return `${Math.floor(mins)} m`;
  if (mins < MINS_IN_DAY) return `${Math.floor(mins / 60)} h`;
  return `${Math.floor(mins / MINS_IN_DAY)} d`;
}

