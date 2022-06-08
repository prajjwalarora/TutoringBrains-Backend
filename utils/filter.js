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

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

module.exports = { filterObj };
