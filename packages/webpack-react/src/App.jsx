import React, { useEffect } from "react";
// const common = require('common/dist');
import common from "common/dist";

const RootApp = () => {

    useEffect(() => {
        onsole.log(common);
        common.http.post('/login', { username: 'admin', password: 'admin123' }, { showLoading: true }).then((res) => {
            console.log(res);
        })
    }, []);
    return <h1>hello wepack-react app</h1>
}

export default RootApp;