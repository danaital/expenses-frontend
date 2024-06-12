"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.LoginPage = void 0;
var react_1 = require("react");
var formik_1 = require("formik");
var yup = require("yup");
var styled_components_1 = require("styled-components");
var material_1 = require("@mui/material");
var axios_1 = require("axios");
var LoginPageContainer = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n"], ["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n"])));
var LoginForm = styled_components_1["default"].form(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: column;\n    width: 300px;\n    padding: 20px;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n"], ["\n    display: flex;\n    flex-direction: column;\n    width: 300px;\n    padding: 20px;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n"])));
exports.LoginPage = function () {
    var _a = react_1.useState(''), username = _a[0], setUsername = _a[1];
    var _b = react_1.useState(''), password = _b[0], setPassword = _b[1];
    var handleUsernameChange = function (event) {
        setUsername(event.target.value);
    };
    var handlePasswordChange = function (event) {
        setPassword(event.target.value);
    };
    var handleSubmit = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].post('localhost:3000/api/auth/login', values)];
                case 1:
                    response = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var validationSchema = yup.object({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required')
    });
    var formik = formik_1.useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit
    });
    return (react_1["default"].createElement(LoginPageContainer, null,
        react_1["default"].createElement(LoginForm, { onSubmit: formik.handleSubmit },
            react_1["default"].createElement(material_1.TextField, { id: "username", name: "username", label: "Username", value: formik.values.username, onChange: formik.handleChange, error: formik.touched.username && Boolean(formik.errors.username), helperText: formik.touched.username && formik.errors.username ? formik.errors.username : ' ' }),
            react_1["default"].createElement("div", { style: { marginBottom: 10 } }),
            react_1["default"].createElement(material_1.TextField, { id: "password", name: "password", label: "Password", type: "password", value: formik.values.password, onChange: formik.handleChange, error: formik.touched.password && Boolean(formik.errors.password), helperText: formik.touched.password && formik.errors.password ? formik.errors.password : ' ' }),
            react_1["default"].createElement("div", { style: { marginBottom: 10 } }),
            react_1["default"].createElement(material_1.Button, { type: "submit", variant: "contained", color: "primary" }, "Login"))));
};
var templateObject_1, templateObject_2;
