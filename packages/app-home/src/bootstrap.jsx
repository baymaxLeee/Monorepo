let root;

export function mount(props) {
    import('host/React').then((React) => {
        import('host/Client').then(({ createRoot }) => {
            import('host/ReactRouter').then((ReactRouter) => {
                const App = require('./App').default;
                const { container, basename } = props;
                root = createRoot(container ? container.querySelector('#root') : document.getElementById('root'));
            
                root.render(
                    <React.StrictMode>
                        <ReactRouter.BrowserRouter basename={basename || '/'}>
                            <App />
                        </ReactRouter.BrowserRouter>
                    </React.StrictMode>
                )
            })
        });
    });
}

export function unmount() {
    root?.unmount();
}