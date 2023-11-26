"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueFileName = void 0;
const path_1 = require("path");
function getUniqueFileName(file, id) {
    const ext = (0, path_1.extname)(file.originalname);
    const fileName = (0, path_1.basename)(file.originalname, ext) + id + ext;
    return fileName;
}
exports.getUniqueFileName = getUniqueFileName;
//# sourceMappingURL=getUniqueFileName.js.map