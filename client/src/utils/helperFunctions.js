/**
 * Commonly used helper / utility functions.
 */

export const formatDateYYYYMMDD = (uglyDate) => {
  const year = uglyDate.substring(0, 4);
  //   const month = monthArr[parseInt(uglyDate.substring(5, 7)) - 1];
  const month = uglyDate.substring(5, 7);
  const day = uglyDate.substring(8, 10);
  const prettyDate = year + "-" + month + "-" + day;

  // Returns date as YYYY-MM-DD
  return prettyDate;
};

export const formatDateDDMonYYYY = (uglyDate) => {
  const monthArr = [
    " Jan ",
    " Feb ",
    " Mar ",
    " Apr ",
    " May ",
    " Jun ",
    " Jul ",
    " Aug ",
    " Sep ",
    " Oct ",
    " Nov ",
    " Dec "
  ];
  const year = uglyDate.substring(0, 4);
  const month = monthArr[parseInt(uglyDate.substring(5, 7)) - 1];
  const day = uglyDate.substring(8, 10);
  const formatDateDDMonYYYY = day + month + year;
  // Returns date as DD Mon YYYY
  return formatDateDDMonYYYY;
};
