export const TITLE_VALIDATION = {
  minLength: 1,
  maxLength: 64,
};

export const DESCRIPTION_VALIDATION = {
  minLength: 1,
  maxLength: 512,
};

export const isISODateString = (str: string) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) {
    return false;
  }

  const date = new Date(str);
  return !isNaN(date.getTime()) && date.toISOString() === str;
};
