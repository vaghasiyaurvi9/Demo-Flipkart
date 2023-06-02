const Multer = `

scalar Upload


type Mutation{
    uploadFile(file: String!): meassageType
    
}
type meassageType{
    message :String
}

`
export default Multer