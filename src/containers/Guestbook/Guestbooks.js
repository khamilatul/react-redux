import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as guestbookActions from 'redux/modules/guestbooks';
import { GuestbookList } from 'components';

@connect(
  state => ({
    guestbooks: state.guestbooks.data,
    getList: PropTypes.func.isRequired,
  }),
  { ...guestbookActions })
export default class Guestbooks extends Component {
  static propTypes = {
    guestbooks: PropTypes.object.isRequired,
    getList: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getList();
  }

  render() {
    const { guestbooks } = this.props;
    console.log(guestbooks);
    return (
      <div className="container">
        <div className="row">
          <h3>Blog Posts</h3>
          <Helmet title="Home" />
          {guestbooks && guestbooks.map(guestbook => <GuestbookList guestbook={guestbook} />)}
        </div>
      </div>
    );
  }
}
