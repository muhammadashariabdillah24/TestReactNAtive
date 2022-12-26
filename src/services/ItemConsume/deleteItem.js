import {del} from '..';

const deleteItem = id => {
  return del(`/deleteitem/${id}`);
};

export {deleteItem};
