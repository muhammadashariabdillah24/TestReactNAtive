import {put} from '..';

const updateItem = (id, params) => {
  return put(`/updateitem/${id}`, params);
};

export {updateItem};
