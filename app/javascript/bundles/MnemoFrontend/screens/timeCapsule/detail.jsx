import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class TimeCapsuleDetail extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {timeCapsule, editOnClickHandler, isEditing} = this.props;
    let {currentUser} = this.context;

    let topicBox = timeCapsule.memory_boxes[0];

    let created_at = moment(timeCapsule.created_at.toLocaleString()).format('LLL')
    let wrap_date = moment(timeCapsule.wrap_date.toLocaleString()).format('LLL')

    return (
      <div className="capsule-box">
        <div className="capsule-detail-container">
          <div className="header-container">
            <div>
              <h3>{timeCapsule.user.name}</h3>
              <div>{created_at}</div>
            </div>
            <div>
              <div>Wrapped {wrap_date}</div>
            </div>
          </div>
          <div className="detail-section">
            <div className="text-container">
              <h3>{timeCapsule.subject}</h3>
              <div className="">
                {topicBox.description}
              </div>
            </div>
            { currentUser.id == timeCapsule.user.id && !isEditing ?
              <button onClick={e => editOnClickHandler(e)} className="edit-button">Edit</button> : null
            }
          </div>
        </div>
      </div>
    );
  }
}

TimeCapsuleDetail.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};

export default TimeCapsuleDetail;