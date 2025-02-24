import React, { useEffect } from "react";
// const common = require('common/dist');
// import common from "shared/dist";

const RootApp = () => {

    useEffect(() => {
        // common.http.post('/login', { username: 'admin', password: 'admin123' }, { showLoading: true }).then((res) => {
        //     console.log(res);
        // })
        import('shared/utils').then(({ greet }) => {
            greet('World');
        });
    }, []);
    return <h1>Hello Home App</h1>
}

export default RootApp;