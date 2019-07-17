export const APP_TITLE = "Saxopholis";

export const pageTitle = (title?: string): string => {
  if (title) {
    return `${title} | ${APP_TITLE}`;
  }
  return APP_TITLE;
};
