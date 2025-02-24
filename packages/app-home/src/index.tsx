import { createRoot } from 'react-dom/client'
import RootApp from "./App";
import './main.less';

const root = createRoot(document.getElementById('root')!);

root.render(<RootApp />)



