import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    // console.log('componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    // console.log(evt.code);
    if (evt.code === 'Escape') {
      // console.log('need close  modal');
      // console.log('this props:' + this.props);
      // console.log(this.props);
      this.props.onClose();
    }
  };

  handleBackdropClick = evt => {
    // console.log('Click to backdrop');
    // console.log('currentTarget: ', evt.currentTarget);
    // console.log('target: ', evt.target);

    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.overlay} onClick={this.handleBackdropClick}>
        <div className={s.modal}>
          {this.props.children}
          {/* <img src='' alt=''/> */}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
