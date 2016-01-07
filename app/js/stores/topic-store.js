import Api from '../utils/api';
import Reflux from 'reflux';
import Actions from '../actions';

export default Reflux.createStore({
    listenables: [Actions],
    getTopics() {
        return Api.get('topics/defaults')
            .then(json => {
                this.topics = json.data;
                this.triggerChange()
            });
    },
    triggerChange() {
        this.trigger('change', this.topics);
    }
});