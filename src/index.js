import dva from 'dva';
import './index.css';
import './commom/less/reset.less'
import createHistory from 'history/createBrowserHistory';



// 1. Initialize
const app = dva();
history: createHistory()
// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
