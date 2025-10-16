import http from "./httpService";
import config from "../config.json"

const apiEndpoint = config.apiUrl + "/users";

export function signup(user) {
    return http.post(apiEndpoint, {
        username: user.username,
        password: user.password,
        name: user.name
    });
}