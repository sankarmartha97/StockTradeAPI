module.exports = {

  removeByAttr: function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  },

  handleKeysCase: (obj) => {
    let obj2 = {};
    Object.keys(obj).map((key) => (obj2[key.toLocaleLowerCase()] = obj[key]));
    return obj2;
  },

  filterRecords: (records,key,value) => records.filter((el) => el[key] == value)

};
