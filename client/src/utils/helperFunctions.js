/**
 * Commonly used helper / utility functions.
 */

export const formatDate = (uglyDate) => {
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
    " Dec ",
  ];
  const year = uglyDate.substring(0, 4);
  //   const month = monthArr[parseInt(uglyDate.substring(5, 7)) - 1];
  const month = uglyDate.substring(5, 7);
  const day = uglyDate.substring(8, 10);
  const prettyDate = year + "-" + month + "-" + day;
  return prettyDate;
};
