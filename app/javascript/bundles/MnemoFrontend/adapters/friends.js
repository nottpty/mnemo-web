import config from '../config/';
import BaseAdapter from './base';

class FriendsAdapter extends BaseAdapter {
  /**
   * Get friends of a user identified by `userId`
   *
   * @param userId {String} - id of the user whose friends are to be fetched
   * @param {Number} [page] - page of records to be fetched, defaults to 1
   *
   * @return {Promise} - a promise which will resolve to the response from server
   */
  static fetch(userId, page = 1) {
    let requestParams = {
      user_id: userId,
      page: page
    };

    return this.prototype.getRequest(config['api']['friends'], requestParams);
  }
}

export default FriendsAdapter;
