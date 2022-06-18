/**
 * Commonly used helper / utility functions.
 */

export const formatDateYYYYMMDD = (uglyDate) => {
  const year = uglyDate.substring(0, 4);
  //   const month = monthArr[parseInt(uglyDate.substring(5, 7)) - 1];
  const month = uglyDate.substring(5, 7);
  const day = uglyDate.substring(8, 10);
  const yyyyMmDddd = year + "-" + month + "-" + day;

  // Returns date as YYYY-MM-DD
  return yyyyMmDddd;
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
    " Dec ",
  ];
  const year = uglyDate.substring(0, 4);
  const month = monthArr[parseInt(uglyDate.substring(5, 7)) - 1];
  const day = uglyDate.substring(8, 10);
  const DdMonYyyy = day + month + year;
  // Returns date as DD Mon YYYY
  return DdMonYyyy;
};

export const filterCatOptions = (optionsArr, birthDate, gender) => {
  // Find out the age of the user
  const age = 2022 - birthDate.substring(0, 4);

  let res = optionsArr;

  // Filter the array options by gender
  if (gender == "Male") {
    res = res.filter((option) => {
      return option.includes("Men");
    });
  } else {
    res = res.filter((option) => {
      return option.includes("Women");
    });
  }

  // Filter the array options by age, ageCat array is already sorted by age
  if (age < 15) {
    // age < 15, dont remove
    return res;
  } else if (age < 18) {
    // 15 <= age < 18, remove U15
    return res.slice(1);
  } else if (age < 21) {
    // 18 <= age < 21, remove U15, U18
    return res.slice(2);
  } else if (age < 23) {
    // 21 <= age < 23, remove U15, U18, U21
    return res.slice(3);
  } else if (age >= 23 && age <= 50) {
    // 23 <= age <= 50, remove U15, U18, U21, U23
    return res.slice(4);
  } else {
    // age > 50, remove U15, U18, U21, U23, Open
    return res.slice(5);
  }
};
