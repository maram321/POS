import http from "./httpService";
import config from "../config.json"

const apiEndpoint = config.apiUrl + "/sales/bill";

export function getSalesBills() {
    return http.get(apiEndpoint);
}

export function getSaleBill(billId) {
    return http.get(apiEndpoint + "/" + billId)
}


export function deleteSaleBill(billId) {
    return http.delete(apiEndpoint + "/" + billId);
}

export function saveSaleBill(bill) {
    return http.post(apiEndpoint + "/new", bill);
}