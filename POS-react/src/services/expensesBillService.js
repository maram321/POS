import http from "./httpService";
import config from "../config.json"

const apiEndpoint = config.apiUrl + "/expenses/bill";

export function getExpensesBills() {
    return http.get(apiEndpoint);
}

export function deleteExpenseBill(expenseId) {
    return http.delete(apiEndpoint + "/" + expenseId);
}

export function saveExpenseBill(expense) {
    return http.post(apiEndpoint + "/new", expense);
}