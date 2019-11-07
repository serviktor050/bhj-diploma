/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {   
    let xhr = new XMLHttpRequest();
    let formData = new FormData;

    xhr.responseType = options.responseType;
    xhr.withCredentials = true;

    if (options.method === "GET") {
        options.url += "?";
        for (let item in options.data) {
            options.url += `${item}=${options.data[item]}&`;
        }
    }else {
        for (let item in options.data) {
            formData.append(item, options.data[item]);
        }
    }

    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = xhr.response;
            options.callback(null, response);
            console.log(response);
        }
    })

    xhr.open(options.method, options.url);
    
    try {
        xhr.send(formData);
    }catch (err) {
        callback(err);
    }

    return xhr
};
