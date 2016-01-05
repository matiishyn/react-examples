import Api from '../utils/api';
import Reflux from 'reflux';

export default Reflux.createStore({
    getTopics() {
        return Api.get('topics/defaults')
            .then(json => this.topics = json.data);
    }
});