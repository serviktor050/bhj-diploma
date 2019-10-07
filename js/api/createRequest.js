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
        for (let name in options.data) {
            options.url += `?${name}=${options.data[name]}&`;
        }  
    }else {
        for (let name in options.data) {
            formData.append(name, options.data[name]);
        }
    }

    xhr.addEventListener("readystatechange", function(event) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = xhr.response;
            options.callback(err, response);
            console.log(response)
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
