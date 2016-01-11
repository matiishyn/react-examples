import Api from '../utils/api';
import Reflux from 'reflux';
import Actions from '../actions';
import _ from 'lodash';

export default Reflux.createStore({
    listenables: [Actions],
    getImages(topicId) {
        return Api.get('topics/' + topicId)
            .then(json => {
                this.images = _.reject(json.data, img => img.is_album);
                this.triggerChange()
            });
    },
    triggerChange() {
        this.trigger('change', this.images);
    }
});