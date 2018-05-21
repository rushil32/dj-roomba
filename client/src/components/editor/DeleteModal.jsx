import React from 'react';

function DeleteModal({ handleClick }) {
  return (
    <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Delete</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            You sure bro?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="button" 
              onClick={handleClick}
              data-dismiss="modal"
              className="btn btn-primary"
            >
              Delete note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
