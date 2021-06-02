import home from './home.js'
import about from './about.js'
import contact from './contact.js'

export default function(app) {
    app.get('/', home);

    app.get('/home', home);
    app.get('/about', about);
    app.get('/contact', contact);
};