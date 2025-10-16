import http from "./httpService";
import config from "../config.json"

const apiEndpoint = config.apiUrl + "/sales";

export function getSales() {
    return http.get(apiEndpoint);
}

export function deleteSale(saleId) {
    return http.delete(apiEndpoint + "/" + saleId);
}

export function saveSale(sale) {
    return http.post(apiEndpoint, sale);
}