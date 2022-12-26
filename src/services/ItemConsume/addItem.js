import {post} from '..';

const addItem = params => {
  return post('/additem', params);
};

export {addItem};
