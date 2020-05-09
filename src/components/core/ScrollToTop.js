import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}


ScrollToTop.propTypes = {
  location: PropTypes.object,
  children: PropTypes.node,
}

export default withRouter(ScrollToTop);
