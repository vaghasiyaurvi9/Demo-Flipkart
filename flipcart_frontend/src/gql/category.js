import { gql } from "@apollo/client";

export const DELETE_CATEGORY = gql`
 mutation DeleteCategory($id: ID) {
  deleteCategory(_id: $id) {
    _id
    name
    
  }

}
 
 `

export const UPDATE_CATEGORY = gql`
mutation UpdateCategory($id: ID, $name: String, $status: String) {
  updateCategory(_id: $id, name: $name, status: $status) {
    name
    _id
  }
}

`

export const CATEGORY_BY_ID = gql`
query CategoryById($categoryByIdId: ID) {
  categoryById(_id: $categoryByIdId) {
    _id
    name
    status
  }
}

`