/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateStatusInput = {
  name: string,
  in: Array< string >,
  id?: string | null,
};

export type ModelStatusConditionInput = {
  name?: ModelStringInput | null,
  in?: ModelStringInput | null,
  and?: Array< ModelStatusConditionInput | null > | null,
  or?: Array< ModelStatusConditionInput | null > | null,
  not?: ModelStatusConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type status = {
  __typename: "status",
  name: string,
  in: Array< string >,
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateStatusInput = {
  name?: string | null,
  in?: Array< string > | null,
  id: string,
};

export type DeleteStatusInput = {
  id: string,
};

export type ModelStatusFilterInput = {
  name?: ModelStringInput | null,
  in?: ModelStringInput | null,
  and?: Array< ModelStatusFilterInput | null > | null,
  or?: Array< ModelStatusFilterInput | null > | null,
  not?: ModelStatusFilterInput | null,
};

export type ModelStatusConnection = {
  __typename: "ModelStatusConnection",
  items:  Array<status | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionStatusFilterInput = {
  name?: ModelSubscriptionStringInput | null,
  in?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionStatusFilterInput | null > | null,
  or?: Array< ModelSubscriptionStatusFilterInput | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateStatusMutationVariables = {
  input: CreateStatusInput,
  condition?: ModelStatusConditionInput | null,
};

export type CreateStatusMutation = {
  createStatus?:  {
    __typename: "status",
    name: string,
    in: Array< string >,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateStatusMutationVariables = {
  input: UpdateStatusInput,
  condition?: ModelStatusConditionInput | null,
};

export type UpdateStatusMutation = {
  updateStatus?:  {
    __typename: "status",
    name: string,
    in: Array< string >,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteStatusMutationVariables = {
  input: DeleteStatusInput,
  condition?: ModelStatusConditionInput | null,
};

export type DeleteStatusMutation = {
  deleteStatus?:  {
    __typename: "status",
    name: string,
    in: Array< string >,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetStatusQueryVariables = {
  id: string,
};

export type GetStatusQuery = {
  getStatus?:  {
    __typename: "status",
    name: string,
    in: Array< string >,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListStatusesQueryVariables = {
  filter?: ModelStatusFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStatusesQuery = {
  listStatuses?:  {
    __typename: "ModelStatusConnection",
    items:  Array< {
      __typename: "status",
      name: string,
      in: Array< string >,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateStatusSubscriptionVariables = {
  filter?: ModelSubscriptionStatusFilterInput | null,
};

export type OnCreateStatusSubscription = {
  onCreateStatus?:  {
    __typename: "status",
    name: string,
    in: Array< string >,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateStatusSubscriptionVariables = {
  filter?: ModelSubscriptionStatusFilterInput | null,
};

export type OnUpdateStatusSubscription = {
  onUpdateStatus?:  {
    __typename: "status",
    name: string,
    in: Array< string >,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteStatusSubscriptionVariables = {
  filter?: ModelSubscriptionStatusFilterInput | null,
};

export type OnDeleteStatusSubscription = {
  onDeleteStatus?:  {
    __typename: "status",
    name: string,
    in: Array< string >,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
