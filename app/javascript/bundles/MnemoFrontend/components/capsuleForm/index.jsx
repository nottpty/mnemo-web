import React from "react";
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import Image from "../../components/image";



const directType = {
  me: 'Only me',
  everyone: 'Everyone who join',
  friend: 'Friend'
};

class CapsuleForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      directTo: 'everyone',
      capsuleName: '',
      capsuleDetail: '',
      friendName: ''
    };

    this.inputOnChangeHandler = this.inputOnChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this._checkIfSelected = this._checkIfSelected.bind(this);
    this._setDirectTo = this._setDirectTo.bind(this);
    this._capsuleNameHandler = this._capsuleNameHandler.bind(this);
    this._capsuleDetailHandler = this._capsuleDetailHandler.bind(this);
    this._friendNameHandler = this._friendNameHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    let {createTimeCapsuleSuccess} = this.props.timeCapsule

    if(prevProps.timeCapsule.creatingTimeCapsule && createTimeCapsuleSuccess) {
      //TODO : Clear Form
    }
  }

  _openUploadWindow(){
    document.getElementById('uploader').click()
  }


  inputOnChangeHandler(e) {
    document.getElementById("submitButton").click();
  }

  _capsuleNameHandler(e){
    e.preventDefault();

    this.setState({
      capsuleName: e.target.value
    });
  }

  _capsuleDetailHandler(e){
    e.preventDefault();

    this.setState({
      capsuleDetail: e.target.value
    });
  }

  _friendNameHandler(e){
    e.preventDefault();

    this.setState({
      friendName: e.target.value
    });
  }

  submitHandler(e) {
    e.preventDefault();

    let {actions} = this.props;

    let data = new FormData(e.target);
    let _this = this;
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/upload");

    xhr.onload = function(event) {
      actions.addMedia(event.target.response)
    };

    xhr.send(data);
  }

  _checkIfSelected(selected) {
    let {directTo} = this.state;

    if (selected == directTo) return 'selected';

    return ''
  }

  _setDirectTo(e, selected) {
    e.preventDefault();

    this.setState({
      directTo: selected
    })
  }

  render() {
    let {wrapDate, openDate, wrapDateChangeHandler, openDateChangeHandler, sendTextHandler, buttonText, medium} = this.props;
    let {currentUser} = this.context;
    let {directTo} = this.state;

    return (
      <div className='comment-field-container'>
        <div className="profile col-1">
          <Image classNames="circle" src={currentUser.image} size="s" />
        </div>
        <div className="form-group col-11">
          <div className="textfield-group">
            <input placeholder="Capsule's Name"  onChange={this._capsuleNameHandler} />
            <textarea placeholder="Tell about these Memories" onChange={this._capsuleDetailHandler} />
          </div>

          <div className="media-form">
            {medium.map((media, index) => {

              return (
                <Image key={index} src={media} size="l" />
              );
            })}
            { medium.length >= 4 ?
              null :
              <div className="upload-container">
                <form
                  onSubmit={this.submitHandler}
                  encType="multipart/form-data">
                  <div className="upload-button" onClick={this._openUploadWindow}>
                    <Image type="standard" classNames='add-icon' size="l"/>
                  </div>

                  <input
                    id="submitButton"
                    style={{ display: "none" }}
                    type="submit"
                    value="Upload"/>

                  <input
                    type="hidden"
                    name="authenticity_token"
                    value={currentUser.csrfToken}/>

                  <input
                    onChange={this.inputOnChangeHandler}
                    style={{ display: "none" }}
                    id="uploader"
                    type="file"
                    name="file"/>
                </form>
              </div>
            }
          </div>

          <div className="timing-container">
            <div>
              <label>Wrap time : </label>
              <div className="small-field">
                <DatePicker selected={wrapDate}
                            selectsStart
                            onChange={wrapDateChangeHandler}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            dateFormat="LT"
                            timeCaption="Time"/>
              </div>
              <div className="large-field">
                <DatePicker selected={wrapDate}
                            selectsStart
                            onChange={wrapDateChangeHandler}/>
              </div>
            </div>
            <div>
              <label>Open time : </label>
              <div className="small-field">
                <DatePicker selected={openDate}
                            selectsStart
                            onChange={openDateChangeHandler}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            dateFormat="LT"
                            timeCaption="Time" />
              </div>
              <div className="large-field">
                <DatePicker selected={openDate}
                            selectsStart
                            onChange={openDateChangeHandler}/>
              </div>
            </div>
          </div>
          <div className="button-container">
            <div>
              <label>Direct to : </label>
              <div className="dropdown show">
                <a className={`btn dropdown-toggle ${directTo == 'friend' ? 'friend' : ''}`}
                   id="dropdownMenuLink"
                   data-toggle="dropdown"
                   aria-haspopup="true"
                   aria-expanded="false">
                  {directType[directTo]}
                </a>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a onClick={e => this._setDirectTo(e, 'me')} className={`dropdown-item ${ this._checkIfSelected('me', directTo)}`} href="#">{directType['me']}</a>
                  <a onClick={e => this._setDirectTo(e, 'everyone')} className={`dropdown-item ${ this._checkIfSelected('everyone', directTo)}`} href="#">{directType['everyone']}</a>
                  <a onClick={e => this._setDirectTo(e, 'friend')} className={`dropdown-item ${ this._checkIfSelected('friend' ,directTo)}`} href="#">{directType['friend']}</a>
                </div>
              </div>
            </div>
            {
             directTo == 'friend' ?
               <div className="friend-seach-container">
                 <input onChange={this._friendNameHandler} />
               </div> : null
            }
            <button className="submit-button" onClick={e => sendTextHandler(e, this.state)}>{buttonText}</button>
          </div>
        </div>
      </div>
    );
  }
}

CapsuleForm.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};


export default CapsuleForm;