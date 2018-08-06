import React, { Component } from 'react';

import './style.css';

class MyButton extends Component {
  render() {
    const {
      small,
      color,
      xsmall,
      primary,
      success,
      children,
      secondary,
      transparent
    } = this.props;

    const styles = `my-button
      ${small ? 'small' : ''}
      ${xsmall ? 'xsmall' : ''}
      ${success ? 'success' : ''}
      ${primary ? 'primary' : ''}
      ${secondary ? 'secondary' : ''}
      ${transparent ? 'transparent' : ''}`;

    return (
      <button className={styles}>
        <div className="my-button-label" style={{ color: color ? color : '' }}>
          {children}
        </div>
      </button>
    );
  }
}

export default MyButton;
