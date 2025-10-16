import http from "./httpService";
import config from "../config.json"

const apiEndpoint = config.apiUrl + "/expenses";

export function getExpenses() {
    return http.get(apiEndpoint);
}

export function deleteExpense(expenseId) {
    return http.delete(apiEndpoint + "/" + expenseId);
}

export function saveExpense(expense) {
    return http.post(apiEndpoint, expense);
}