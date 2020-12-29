import { URL_API } from "./../config/contant.js";

const callApi = (uri, method, data) => {
    return axios({
        url: `${URL_API}/${uri}`,
        method,
        data,
    });
}

export { callApi };