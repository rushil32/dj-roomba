import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function Alert({ text = 'Something went wrong.', toggle = true, type = 'ERROR' }) {
  const messageStyle = { display: toggle ? 'block' : 'none' };

  return (
    <div>
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        transitionAppear={true}
        transitionAppearTimeout={500}
      >
        <div key={1} className="error-message" style={messageStyle}>
          <span>{text}</span>
        </div>
      </ReactCSSTransitionGroup>
    </div>
  );
}

export default Alert;
