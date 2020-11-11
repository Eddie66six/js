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
  return _groupBy(field, this);
}

function _groupBy(field, array) {
  let result = [];
  for (var i = 0; i < array.length; i++) {

    let obj = {
      field: null,
      itens: [],
    }
    if (array[i].hasOwnProperty(field)) {
      //exist
      for (var ii = 0; ii < result.length; ii++) {
        if (result[ii].field == array[i][field]) {
          obj = result[ii];
          break;
        }
      }
      if (!obj.field && obj.field != "") {
        obj.field = array[i][field];
        obj.itens.push(array[i]);
        result.push(obj);
      }
      else
        obj.itens.push(array[i]);
    } else {
      let finded = false;
      for (let index = 0; index < result.length; index++) {
        if (result[index].field == '' ) {
            result[index].itens.push(array[i])
            finded = true;
            break;
        }
      }
      if (!finded) {
        obj = {
          field: '',
          itens: [array[i]]
        };
        result.push(obj);
      }
    }
  }
  return result;
}

let array = [
  { field1: 'a', field2: 1 },
  { field1: 'a', field2: 1 },
  { field1: 'a', field2: 1 },
  { field1: 'b', field2: 1 },
  { field1: 'c', field2: 1 },
  { field2: 1 }
];

console.log('original array', array);
console.log('distinct', array.distinct());
console.log('distinctField', array.distinctField('field1'));
console.log('groupBy', array.groupBy('field1'));