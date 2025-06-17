async function Crud(apiUrl, headers, data, method, whereField, whereValue) {
    let response, resdata;
    if (apiUrl && method) {
        let CheckMethod = method.toUpperCase();

        if (!["POST", "PUT", "DELETE", "GET"].includes(CheckMethod)) {
            return "  Incorrect HTTP method provided.";
        }

        if ((whereField && whereValue) && !["GET", "PUT"].includes(CheckMethod)) {
            return "  'where' condition is only valid with GET or PUT methods.";
        }

        if (whereField && !whereValue) {
            return "  Please enter a value for the where condition.";
        } else if (!whereField && whereValue) {
            return "  Please enter a field name for the where condition.";
        } else if (whereField && whereValue) {
            response = await fetch(apiUrl + "?" + whereField + "=" + whereValue);
            resdata = await response.json();
            return resdata;
        } else {
            switch (method) {
                case "GET":
                    response = await fetch(apiUrl);
                    resdata = await response.json();
                    return resdata;
                    break;

                default:
                    try {
                        response = await fetch(apiUrl, {
                            method: method,
                            headers: headers,
                            body: JSON.stringify(data),
                        });
                        resdata = await response.json();
                        return resdata;
                    } catch (e) {
                        return " Fetch Error: " + e.message;
                    }
            }
        }
    } else {
        return "  Missing API URL or method.";
    }
}
window.Crud = Crud;
