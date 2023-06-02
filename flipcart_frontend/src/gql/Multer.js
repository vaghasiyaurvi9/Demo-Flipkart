import { gql } from "@apollo/client";

export const UPLOADFILE = gql`

mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`