import { BackendAPI } from "../../lib/api";

export default class ResultService {
    // static getResults(payload) {
    //     return BackendAPI.get('/student/result2/', payload);
    // }

    static getResults(query = "") {
        return BackendAPI.get(`/student/result2?${query}`)
    }

    static getStaffSales(query = "") {
        return BackendAPI.get(`/staff/sales?${query}`)
    }
}