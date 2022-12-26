import {get} from '..';

const searchItem = name => {
  return get(`/searchitem/${name}`);
};

export {searchItem};
