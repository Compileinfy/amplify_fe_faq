/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateAnswerModel = /* GraphQL */ `subscription OnCreateAnswerModel(
  $filter: ModelSubscriptionAnswerModelFilterInput
) {
  onCreateAnswerModel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAnswerModelSubscriptionVariables,
  APITypes.OnCreateAnswerModelSubscription
>;
export const onCreateFormModel = /* GraphQL */ `subscription OnCreateFormModel($filter: ModelSubscriptionFormModelFilterInput) {
  onCreateFormModel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateFormModelSubscriptionVariables,
  APITypes.OnCreateFormModelSubscription
>;
export const onCreateQuestionModel = /* GraphQL */ `subscription OnCreateQuestionModel(
  $filter: ModelSubscriptionQuestionModelFilterInput
) {
  onCreateQuestionModel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateQuestionModelSubscriptionVariables,
  APITypes.OnCreateQuestionModelSubscription
>;
export const onCreateUserModel = /* GraphQL */ `subscription OnCreateUserModel($filter: ModelSubscriptionUserModelFilterInput) {
  onCreateUserModel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserModelSubscriptionVariables,
  APITypes.OnCreateUserModelSubscription
>;
export const onDeleteAnswerModel = /* GraphQL */ `subscription OnDeleteAnswerModel(
  $filter: ModelSubscriptionAnswerModelFilterInput
) {
  onDeleteAnswerModel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAnswerModelSubscriptionVariables,
  APITypes.OnDeleteAnswerModelSubscription
>;
export const onDeleteFormModel = /* GraphQL */ `subscription OnDeleteFormModel($filter: ModelSubscriptionFormModelFilterInput) {
  onDeleteFormModel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteFormModelSubscriptionVariables,
  APITypes.OnDeleteFormModelSubscription
>;
export const onDeleteQuestionModel = /* GraphQL */ `subscription OnDeleteQuestionModel(
  $filter: ModelSubscriptionQuestionModelFilterInput
) {
  onDeleteQuestionModel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteQuestionModelSubscriptionVariables,
  APITypes.OnDeleteQuestionModelSubscription
>;
export const onDeleteUserModel = /* GraphQL */ `subscription OnDeleteUserModel($filter: ModelSubscriptionUserModelFilterInput) {
  onDeleteUserModel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserModelSubscriptionVariables,
  APITypes.OnDeleteUserModelSubscription
>;
export const onUpdateAnswerModel = /* GraphQL */ `subscription OnUpdateAnswerModel(
  $filter: ModelSubscriptionAnswerModelFilterInput
) {
  onUpdateAnswerModel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAnswerModelSubscriptionVariables,
  APITypes.OnUpdateAnswerModelSubscription
>;
export const onUpdateFormModel = /* GraphQL */ `subscription OnUpdateFormModel($filter: ModelSubscriptionFormModelFilterInput) {
  onUpdateFormModel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateFormModelSubscriptionVariables,
  APITypes.OnUpdateFormModelSubscription
>;
export const onUpdateQuestionModel = /* GraphQL */ `subscription OnUpdateQuestionModel(
  $filter: ModelSubscriptionQuestionModelFilterInput
) {
  onUpdateQuestionModel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateQuestionModelSubscriptionVariables,
  APITypes.OnUpdateQuestionModelSubscription
>;
export const onUpdateUserModel = /* GraphQL */ `subscription OnUpdateUserModel($filter: ModelSubscriptionUserModelFilterInput) {
  onUpdateUserModel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserModelSubscriptionVariables,
  APITypes.OnUpdateUserModelSubscription
>;
