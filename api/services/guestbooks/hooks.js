import hooks from 'feathers-hooks';
import { hooks as auth } from 'feathers-authentication';
import { validateHook as validate } from '../../hooks';
import { required } from '../../utils/validation';
import uuid from 'uuid';
import dashify from 'dashify';

const schemaValidator = {
  name: [required],
  email: [required],
  address: [required],
  comment: [required]

};

const options = {
  service: 'guestbooks',
  field: 'sentBy'
};

const guestbookHooks = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      validate(schemaValidator),
      hook => {
        hook.data = {
          _id: uuid.v4(),
          name: hook.data.name,
          slug: dashify(hook.data.name),
          email: hook.data.email,
          address: hook.data.address,
          comment: hook.data.comment


        };
      },
      hook => {
        hook.data.createdAt = new Date();
      }
    ],
    update: [
      validate(schemaValidator),
      hook => {
        hook.data = {
          name: hook.data.name,
          slug: dashify(hook.data.name),
          email: hook.data.email,
          address: hook.data.address,
          comment: hook.data.comment
        };
      },
      hook => {
        hook.data.updatedAt = new Date();
      }
    ],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

export default guestbookHooks;
