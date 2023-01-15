/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStatus = /* GraphQL */ `
  query GetStatus($id: ID!) {
    getStatus(id: $id) {
      name
      in
      id
      createdAt
      updatedAt
    }
  }
`;
export const listStatuses = /* GraphQL */ `
  query ListStatuses(
    $filter: ModelStatusFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStatuses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        name
        in
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
