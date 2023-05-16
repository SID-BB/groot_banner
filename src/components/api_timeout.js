export const apitimeout = (ms, promise) => {
    return new Promise((resolve, reject) => {
        if(localStorage.getItem('token')) {
            const timeoutId = setTimeout(() => {
                reject(new Error("promise timeout"))
            }, ms);
            promise.then(
                (res) => {
                    clearTimeout(timeoutId);
                    resolve(res);
                },
                (err) => {
                    clearTimeout(timeoutId);
                    reject(err);
                }
            );
        }
        // else {
        //     window.location.reload();
        //     reject('No Token');
        // }
    })
}