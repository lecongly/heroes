"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_service_1 = __importDefault(require("./employee.service"));
const http_exception_1 = __importDefault(require("../utils/exception/http.exception"));
class EmployeeController {
    constructor() {
        this.employeeService = new employee_service_1.default();
        this.getAllEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield this.employeeService.getAll();
                res.status(200).json({ data: employees });
            }
            catch (e) {
                next(new http_exception_1.default(400, 'cant not get all employees'));
            }
        });
        this.createEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const employee = yield this.employeeService.create(Object.assign({}, body));
                res.status(201).json({ data: employee });
            }
            catch (e) {
                next(new http_exception_1.default(400, 'cant not create employees'));
            }
        });
        this.getEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const employee = yield this.employeeService.getOne(id);
                res.status(201).json({ data: employee });
            }
            catch (e) {
                next(new http_exception_1.default(400, e.message));
            }
        });
        this.path = '/employee';
        this.router = (0, express_1.Router)();
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.get(`${this.path}`, this.getAllEmployee);
        this.router.post(`${this.path}`, this.createEmployee);
        this.router.get(`${this.path}/:id`, this.getEmployee);
    }
}
exports.default = EmployeeController;
