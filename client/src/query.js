import { gql } from "@apollo/client";

// export const DATA = gql`
// {
//     hello
// }
// `;

export const GET_USER = gql`
    query {
        getUser {
            firstName
            age
        }
    }
`;