Array.prototype.indexOfObject = function (obj) {
  let arrayProperties = [];
  var keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    arrayProperties.push(keys[i]);
  }
  for (i = 0; i < this.length; i++) {
    let propertiesOK = true;
    for (var ii = 0; ii < arrayProperties.length; ii++) {
      if (!(this[i][arrayProperties[ii]] === obj[arrayProperties[ii]])) {
        propertiesOK = false;
        break;
      }
    }
    if (propertiesOK) {
      return i
    }
  }
  return -1;
}

Array.prototype.distinct = function () {
  let result = [];
  for (var i = 0; i < this.length; i++) {
    if (result.indexOfObject(this[i]) == -1)
      result.push(this[i]);
  }
  return result;
}

Array.prototype.distinctField = function (field) {
  let arrayProperties = [];
  if (!field) return [];
  for (var i = 0; i < this.length; i++) {
    if (arrayProperties.indexOf(this[i][field]) == -1)
      arrayProperties.push(this[i][field]);
  }
  return arrayProperties;
}

Array.prototype.groupBy = function (field) {
  let result = [];
  for (var i = 0; i < this.length; i++) {
    if (this[i].hasOwnProperty(field)) {
      let obj = {
        field: null,
        itens: []
      }
      //exist
      for (var ii = 0; ii < result.length; ii++) {
        if (result[ii].field == this[i][field]) {
          obj = result[ii];
          break;
        }
      }
      if (!obj.field) {
        obj.field = this[i][field];
        obj.itens.push(this[i]);
        result.push(obj);
      }
      else
        obj.itens.push(this[i]);
    }
  }
  return result;
}

let array = [
  { a: 'a', b: 1 },
  { a: 'a', b: 1 },
  { a: 'a', b: 1 },
  { a: 'b', b: 1 },
  { a: 'c', b: 1 }
];

console.log('original array', array);
console.log('distinct', array.distinct());
console.log('distinctField', array.distinctField('a'));
console.log('groupBy', array.groupBy('a'));