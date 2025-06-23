/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getAnswerModel = /* GraphQL */ `query GetAnswerModel($answerId: ID!) {
  getAnswerModel(answerId: $answerId) {
    answerId
    answeredby {
      createdAt
      email
      firstname
      lastname
      updatedAt
      userId
      __typename
    }
    createdAt
    questionId
    questions {
      createdAt
      formId
      options
      question
      questionId
      updatedAt
      userId
      __typename
    }
    selectedOptions
    updatedAt
    userId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAnswerModelQueryVariables,
  APITypes.GetAnswerModelQuery
>;
export const getFormModel = /* GraphQL */ `query GetFormModel($formId: ID!) {
  getFormModel(formId: $formId) {
    createdAt
    createdBy {
      createdAt
      email
      firstname
      lastname
      updatedAt
      userId
      __typename
    }
    formId
    formQuestions {
      nextToken
      __typename
    }
    title
    updatedAt
    userId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetFormModelQueryVariables,
  APITypes.GetFormModelQuery
>;
export const getQuestionModel = /* GraphQL */ `query GetQuestionModel($questionId: ID!) {
  getQuestionModel(questionId: $questionId) {
    answers {
      nextToken
      __typename
    }
    askedby {
      createdAt
      email
      firstname
      lastname
      updatedAt
      userId
      __typename
    }
    createdAt
    form {
      createdAt
      formId
      title
      updatedAt
      userId
      __typename
    }
    formId
    options
    question
    questionId
    updatedAt
    userId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetQuestionModelQueryVariables,
  APITypes.GetQuestionModelQuery
>;
export const getUserModel = /* GraphQL */ `query GetUserModel($userId: ID!) {
  getUserModel(userId: $userId) {
    answers {
      nextToken
      __typename
    }
    createdAt
    email
    firstname
    forms {
      nextToken
      __typename
    }
    lastname
    questions {
      nextToken
      __typename
    }
    updatedAt
    userId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserModelQueryVariables,
  APITypes.GetUserModelQuery
>;
export const listAnswerModels = /* GraphQL */ `query ListAnswerModels(
  $answerId: ID
  $filter: ModelAnswerModelFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listAnswerModels(
    answerId: $answerId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      answerId
      createdAt
      questionId
      selectedOptions
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAnswerModelsQueryVariables,
  APITypes.ListAnswerModelsQuery
>;
export const listFormModels = /* GraphQL */ `query ListFormModels(
  $filter: ModelFormModelFilterInput
  $formId: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listFormModels(
    filter: $filter
    formId: $formId
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      formId
      title
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFormModelsQueryVariables,
  APITypes.ListFormModelsQuery
>;
export const listQuestionModelByFormId = /* GraphQL */ `query ListQuestionModelByFormId(
  $filter: ModelquestionModelFilterInput
  $formId: ID!
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listQuestionModelByFormId(
    filter: $filter
    formId: $formId
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      formId
      options
      question
      questionId
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListQuestionModelByFormIdQueryVariables,
  APITypes.ListQuestionModelByFormIdQuery
>;
export const listQuestionModels = /* GraphQL */ `query ListQuestionModels(
  $filter: ModelQuestionModelFilterInput
  $limit: Int
  $nextToken: String
  $questionId: ID
  $sortDirection: ModelSortDirection
) {
  listQuestionModels(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    questionId: $questionId
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      formId
      options
      question
      questionId
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListQuestionModelsQueryVariables,
  APITypes.ListQuestionModelsQuery
>;
export const listUserModels = /* GraphQL */ `query ListUserModels(
  $filter: ModelUserModelFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $userId: ID
) {
  listUserModels(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    userId: $userId
  ) {
    items {
      createdAt
      email
      firstname
      lastname
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserModelsQueryVariables,
  APITypes.ListUserModelsQuery
>;
