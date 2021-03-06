import config from '../config/';
import BaseAdapter from './base';

class MediumAdapter extends BaseAdapter {
  /**
   * Get meium of a user identified by `userId`
   *
   * @param userId {String} - id of the user whose friends are to be fetched
   *
   * @return {Promise} - a promise which will resolve to the response from server
   */
  static fetch(userId) {
    let requestParams = {
      user_id: userId
    };

    return this.prototype.getRequest(config['api']['medium'], requestParams);
  }
}

export default MediumAdapter;
