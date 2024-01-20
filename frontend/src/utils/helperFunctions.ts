export function formatBytes(bytes: number, decimals = 2) {
  if (!Number(bytes)) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export const getKeyByValue = <T>(obj: { [key: string]: T }, value: T): string => {
  for (const key in obj) {
    if (obj[key] === value) {
      return key;
    }
  }

  return '';
};
