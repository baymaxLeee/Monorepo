import { createRoot } from 'react-dom/client'
import App from "./App";
import './main.less';

function RootApp () {

    return <h1>Root app</h1>
}

const root = createRoot(document.getElementById('root')!);

root.render(<RootApp />)



