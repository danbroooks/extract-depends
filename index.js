const _ = require('lodash');
const precinct = require('precinct');
const path = require('path');

const resolve = (include, caller) => {
  return require.resolve(path.resolve(path.dirname(caller), include));
};

const isInternalDep = dep => dep[0] === '.'

const depends = (file) => {
  const paperwork = precinct.paperwork(file);

  const internal = paperwork
    .filter(isInternalDep)
    .map(d => resolve(d, file));

  return _.union(
    _.reject(paperwork, isInternalDep),
    _.flatten(internal.map(depends))
  );
};

module.exports = depends;
