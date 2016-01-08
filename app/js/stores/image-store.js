import Api from '../utils/api';
import Reflux from 'reflux';
import Actions from '../actions';

export default Reflux.createStore({
    listenables: [Actions],
    getImages(topicId) {
        return Api.get('topics/' + topicId)
            .then(json => {
                this.images = json.data;
                this.triggerChange()
            });
    },
    triggerChange() {
        this.trigger('change', this.images);
    }
});