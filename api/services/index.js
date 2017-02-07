import users from './users';
import messages from './messages';
import guestbooks from './guestbooks'

export default function services() {
  const app = this;

  app.configure(users);
  app.configure(guestbooks);
  app.configure(messages);
}
