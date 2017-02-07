/* eslint linebreak-style: ["error", "windows"]*/

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const GuestbookList = ({ guestbook }) => (
  <div>
    <div className="media well">
      <div className="media-body">
        <h4 className="media-heading">
          <strong>
            <Link to={`guestbook/${guestbook.slug}`}>{guestbook.name}</Link>
          </strong>
        </h4>
        {guestbook.name}
        {guestbook.email}
        {guestbook.address}
        {guestbook.comment}
        <br />
      </div>
    </div>
  </div>
);

GuestbookList.propTypes = {
  guestbook: PropTypes.object.isRequired
};

export default GuestbookList;
