"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./App.css");
var login_page_1 = require("./libs/features/login/login-page");
function App() {
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement(login_page_1.LoginPage, null)));
}
exports["default"] = App;
