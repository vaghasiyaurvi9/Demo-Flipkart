// const { createWriteStream } = require('fs');
// const { graphqlUploadExpress } = require('graphql-upload');
// import { createWriteStream, readFile } from 'fs';
// import singleFileUpload from '../model/Singleupload.js';
// import { readFile } from '../MiddleWare/file.js';
// const Multer = {

//     Mutation: {
//         uploadFile: async (_, { file }) => {
//             const imageUrl = await readFile(file);

//             const singleFile =  singleFileUpload({image:imageUrl});
//             await singleFile.save();
//             return{
//                 message:"single file upload successfully"
//             }

//         },

//     }
// }
// export default Multer