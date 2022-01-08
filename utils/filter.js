module.exports = (data, filterList) => {
  const keys = Object.keys(data);
  const filteredData = {};
  keys.forEach((key) => {
    if (filterList.includes(key)) {
      filteredData[key] = data[key];
    }
  });
  return filteredData;
};
