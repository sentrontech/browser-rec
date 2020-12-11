"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var PORT = 9999;
var app = express_1["default"]();
var file = function (p) { return path_1["default"].resolve(__dirname, p); };
app.use(express_1["default"].json());
app.set('view engine', 'ejs');
app.set('views', path_1["default"].resolve(__dirname, 'template'));
app.use('/template/layout', function (req, res) {
    return res.render(file('./template/layout.ejs'), { partial: false });
});
app.use('/template/:id', function (req, res) {
    return res.render(file('./template/layout.ejs'), { partial: req.params.id });
});
app.use('/dist', express_1["default"].static(file('../../dist')));
console.log('>>>>>>>>>>>>>>> RUNNING ');
app.listen(PORT);
