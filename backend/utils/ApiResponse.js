class ApiResponse {
    constructor(statusCode, data, massages = "Success",) {
        this.statusCode = statusCode
        this.data = data
        this.massages = massages
        this.success = statusCode < 400
    }
}

export { ApiResponse }