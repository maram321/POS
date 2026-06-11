import http from "./httpService";
import config from "../config.json"

const apiEndpoint = config.apiUrl + "/expenses/list";

export function getExpenses() {
    return http.get(apiEndpoint);
}

export function getExpense(saleId) {
    return http.get(apiEndpoint + "/" + saleId)
}


export function deleteExpense(expenseId) {
    return http.delete(apiEndpoint + "/" + expenseId);
}

export function saveExpense(expense) {
    return http.post(apiEndpoint + "/new", expense);
}

export function editExpense(expense) {
    if (expense._id) {
        const body = {...expense};
        delete body._id;
        return http.put(apiEndpoint + "/" +expense._id, body)
    }
}