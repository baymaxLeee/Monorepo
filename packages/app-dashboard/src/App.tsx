import React, { useEffect } from "react";
// const common = require('common/dist');
// import common from "shared/dist";

const RootApp = () => {

    useEffect(() => {
        // common.http.post('/login', { username: 'admin', password: 'admin123' }, { showLoading: true }).then((res) => {
        //     console.log(res);
        // })
    }, []);
    return <h1>Hello Dashboard App</h1>
}

export default RootApp;