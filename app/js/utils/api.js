let rootUrl = 'https://api.imgur.com/3/';
let apiKey = '79a352557b9da50';


let api = {
    get(url) {
        return fetch(rootUrl + url, {
            headers: {
                'Authorization': `Client-ID ${apiKey}`
            }
        })
            .then(resp => resp.json());
    }
};

window.api = api;
export default api;