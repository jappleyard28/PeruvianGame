exports.getRandInt = (max) => Math.floor(Math.random() * max);

exports.getObjValues = (obj) => Object.keys(obj).map((key) => obj[key]);
