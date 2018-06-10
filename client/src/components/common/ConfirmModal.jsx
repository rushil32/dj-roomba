import React from 'react';

function ConfirmModal({ question, handleSubmit, name }) {
  function closeModal() {
    window.$(`#${name}`).modal('hide');
  }

  return (
    <div className="modal fade" id={name} tabindex="-1" role="dialog">
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <h3>{question}</h3>
          </div>
          <div className="modal-footer">
            <button onClick={closeModal} className="btn btn-link">Nope</button>
            <button onClick={handleSubmit} type="button" className="btn btn-primary">Do it</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
