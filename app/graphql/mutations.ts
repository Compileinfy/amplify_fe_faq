/* tslint:disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createAnswerModel = /* GraphQL */ `mutation CreateAnswerModel(
  $condition: ModelAnswerModelConditionInput
  $input: CreateAnswerModelInput!
) {
  createAnswerModel(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateAnswerModelMutationVariables,
  APITypes.CreateAnswerModelMutation
>;
export const createFormModel = /* GraphQL */ `mutation CreateFormModel(
  $condition: ModelFormModelConditionInput
  $input: CreateFormModelInput!
) {
  createFormModel(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateFormModelMutationVariables,
  APITypes.CreateFormModelMutation
>;
export const createQuestionModel = /* GraphQL */ `mutation CreateQuestionModel(
  $condition: ModelQuestionModelConditionInput
  $input: CreateQuestionModelInput!
) {
  createQuestionModel(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateQuestionModelMutationVariables,
  APITypes.CreateQuestionModelMutation
>;
export const createUserModel = /* GraphQL */ `mutation CreateUserModel(
  $condition: ModelUserModelConditionInput
  $input: CreateUserModelInput!
) {
  createUserModel(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserModelMutationVariables,
  APITypes.CreateUserModelMutation
>;
export const deleteAnswerModel = /* GraphQL */ `mutation DeleteAnswerModel(
  $condition: ModelAnswerModelConditionInput
  $input: DeleteAnswerModelInput!
) {
  deleteAnswerModel(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteAnswerModelMutationVariables,
  APITypes.DeleteAnswerModelMutation
>;
export const deleteFormModel = /* GraphQL */ `mutation DeleteFormModel(
  $condition: ModelFormModelConditionInput
  $input: DeleteFormModelInput!
) {
  deleteFormModel(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteFormModelMutationVariables,
  APITypes.DeleteFormModelMutation
>;
export const deleteQuestionModel = /* GraphQL */ `mutation DeleteQuestionModel(
  $condition: ModelQuestionModelConditionInput
  $input: DeleteQuestionModelInput!
) {
  deleteQuestionModel(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteQuestionModelMutationVariables,
  APITypes.DeleteQuestionModelMutation
>;
export const deleteUserModel = /* GraphQL */ `mutation DeleteUserModel(
  $condition: ModelUserModelConditionInput
  $input: DeleteUserModelInput!
) {
  deleteUserModel(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUserModelMutationVariables,
  APITypes.DeleteUserModelMutation
>;
export const updateAnswerModel = /* GraphQL */ `mutation UpdateAnswerModel(
  $condition: ModelAnswerModelConditionInput
  $input: UpdateAnswerModelInput!
) {
  updateAnswerModel(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateAnswerModelMutationVariables,
  APITypes.UpdateAnswerModelMutation
>;
export const updateFormModel = /* GraphQL */ `mutation UpdateFormModel(
  $condition: ModelFormModelConditionInput
  $input: UpdateFormModelInput!
) {
  updateFormModel(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateFormModelMutationVariables,
  APITypes.UpdateFormModelMutation
>;
export const updateQuestionModel = /* GraphQL */ `mutation UpdateQuestionModel(
  $condition: ModelQuestionModelConditionInput
  $input: UpdateQuestionModelInput!
) {
  updateQuestionModel(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateQuestionModelMutationVariables,
  APITypes.UpdateQuestionModelMutation
>;
export const updateUserModel = /* GraphQL */ `mutation UpdateUserModel(
  $condition: ModelUserModelConditionInput
  $input: UpdateUserModelInput!
) {
  updateUserModel(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserModelMutationVariables,
  APITypes.UpdateUserModelMutation
>;
