import http from "./httpService";
import config from "../config.json"

const apiEndpoint = config.apiUrl + "/sales/list";

export function getSales() {
    return http.get(apiEndpoint);
}

export function getSale(saleId) {
    return http.get(apiEndpoint + "/" + saleId)
}

export function deleteSale(saleId) {
    return http.delete(apiEndpoint + "/" + saleId);
}

export function saveSale(sale) {
    return http.post(apiEndpoint + "/new" , sale);
}

export function editSale(sale) {
    if (sale._id) {
        const body = {...sale};
        delete body._id;
        return http.put(apiEndpoint + "/" +sale._id, body)
    }
}