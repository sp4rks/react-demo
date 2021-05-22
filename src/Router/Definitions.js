import TokenPage from '../Pages/Token';
import FortunePage from '../Pages/Fortune';
import HomePage from '../Pages/Home';

var Definitions = [
    {
        path: "/",
        name: "Home",
        page: HomePage,
        authRequired: false,
        exact: true
    },
    {
        path: "/tokens",
        name: "Tokens",
        page: TokenPage,
        authRequired: false
    },
    {
        path: "/fortune",
        name: "Fortune",
        page: FortunePage,
        authRequired: true
    }
];

export default Definitions;