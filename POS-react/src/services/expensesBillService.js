import http from "./httpService";
import config from "../config.json"

const apiEndpoint = config.apiUrl + "/expenses/bill";

export function getExpensesBills() {
    return http.get(apiEndpoint);
}

export function getExpenseBill(billId) {
    return http.get(apiEndpoint + "/" + billId)
}

export function deleteExpenseBill(billId) {
    return http.delete(apiEndpoint + "/" + billId);
}

export function saveExpenseBill(bill) {
    return http.post(apiEndpoint + "/new", bill);
}