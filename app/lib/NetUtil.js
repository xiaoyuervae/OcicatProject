import Util from "./Util";
let NetUtil;

let fetchFunction = (url, options, callback) => {
    fetch(url, options)
        .then((response) => response.text())
        .then((responseText) => {
            if (Util.isNotBlank(responseText)) {
                callback(responseText);
            } else {
                callback(JSON.parse(responseText));
            }
        }).done();
};
NetUtil = {
    postJson(url, data, callback){
        let fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        };
        fetchFunction(url, fetchOptions, callback);
    },

    getJson(url, key, value, callback) {
        let getOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        url = url + "?" + key + "=" + value;
        fetchFunction(url, getOptions, callback);
    },

    getJsonByToken(url, token, callback) {
        let getTokenOptions = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            },
        };
        fetchFunction(url, getTokenOptions, callback);
    },
};
export default NetUtil;

