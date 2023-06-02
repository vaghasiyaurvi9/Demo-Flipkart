// const UploadForm = () => {
//     const [file, setFile] = useState(null);
//     const [uploadFile] = useMutation(UPLOAD_FILE);
  
//     const handleFileChange = (e) => {
//       setFile(e.target.files[0]);
//     };
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       uploadFile({ variables: { file } })
//         .then(() => {
//           console.log('File uploaded successfully');
//         })
//         .catch((error) => {
//           console.error('Error uploading file:', error);
//         });
//     };
  
//     return (
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>
//     );
//   };
  
//   export default UploadForm;