// import * as Multer from 'multer'
// import * as path from 'node:path'

// export const storageMulter = Multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./src/tmp");
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(
//         null,
//         file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//       );
//     },
//   });

// export const upload = Multer({ storage: storageMulter });