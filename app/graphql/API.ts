/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type answerModel = {
  __typename: "answerModel",
  answerId: string,
  answeredby?: userModel | null,
  createdAt?: string | null,
  questionId: string,
  questions?: questionModel | null,
  selectedOptions: Array< string | null >,
  updatedAt?: string | null,
  userId: string,
};

export type userModel = {
  __typename: "userModel",
  answers?: ModelanswerModelConnection | null,
  createdAt?: string | null,
  email: string,
  firstname?: string | null,
  forms?: ModelformModelConnection | null,
  lastname?: string | null,
  questions?: ModelquestionModelConnection | null,
  updatedAt?: string | null,
  userId: string,
};

export type ModelanswerModelConnection = {
  __typename: "ModelanswerModelConnection",
  items:  Array<answerModel | null >,
  nextToken?: string | null,
};

export type ModelformModelConnection = {
  __typename: "ModelformModelConnection",
  items:  Array<formModel | null >,
  nextToken?: string | null,
};

export type formModel = {
  __typename: "formModel",
  createdAt?: string | null,
  createdBy?: userModel | null,
  formId: string,
  formQuestions?: ModelquestionModelConnection | null,
  title: string,
  updatedAt?: string | null,
  userId: string,
};

export type ModelquestionModelConnection = {
  __typename: "ModelquestionModelConnection",
  items:  Array<questionModel | null >,
  nextToken?: string | null,
};

export type questionModel = {
  __typename: "questionModel",
  answers?: ModelanswerModelConnection | null,
  askedby?: userModel | null,
  createdAt?: string | null,
  form?: formModel | null,
  formId: string,
  options: Array< string | null >,
  question: string,
  questionId: string,
  updatedAt?: string | null,
  userId: string,
};

export type ModelAnswerModelFilterInput = {
  and?: Array< ModelAnswerModelFilterInput | null > | null,
  answerId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelAnswerModelFilterInput | null,
  or?: Array< ModelAnswerModelFilterInput | null > | null,
  questionId?: ModelIDInput | null,
  selectedOptions?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelAnswerModelConnection = {
  __typename: "ModelAnswerModelConnection",
  items:  Array<answerModel | null >,
  nextToken?: string | null,
};

export type ModelFormModelFilterInput = {
  and?: Array< ModelFormModelFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  formId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  not?: ModelFormModelFilterInput | null,
  or?: Array< ModelFormModelFilterInput | null > | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type ModelFormModelConnection = {
  __typename: "ModelFormModelConnection",
  items:  Array<formModel | null >,
  nextToken?: string | null,
};

export type ModelquestionModelFilterInput = {
  and?: Array< ModelquestionModelFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  formId?: ModelIDInput | null,
  not?: ModelquestionModelFilterInput | null,
  options?: ModelStringInput | null,
  or?: Array< ModelquestionModelFilterInput | null > | null,
  question?: ModelStringInput | null,
  questionId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type ModelQuestionModelFilterInput = {
  and?: Array< ModelQuestionModelFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  formId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  not?: ModelQuestionModelFilterInput | null,
  options?: ModelStringInput | null,
  or?: Array< ModelQuestionModelFilterInput | null > | null,
  question?: ModelStringInput | null,
  questionId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type ModelQuestionModelConnection = {
  __typename: "ModelQuestionModelConnection",
  items:  Array<questionModel | null >,
  nextToken?: string | null,
};

export type ModelUserModelFilterInput = {
  and?: Array< ModelUserModelFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstname?: ModelStringInput | null,
  id?: ModelIDInput | null,
  lastname?: ModelStringInput | null,
  not?: ModelUserModelFilterInput | null,
  or?: Array< ModelUserModelFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type ModelUserModelConnection = {
  __typename: "ModelUserModelConnection",
  items:  Array<userModel | null >,
  nextToken?: string | null,
};

export type ModelAnswerModelConditionInput = {
  and?: Array< ModelAnswerModelConditionInput | null > | null,
  answerId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  not?: ModelAnswerModelConditionInput | null,
  or?: Array< ModelAnswerModelConditionInput | null > | null,
  questionId?: ModelIDInput | null,
  selectedOptions?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type CreateAnswerModelInput = {
  answerId: string,
  createdAt?: string | null,
  questionId: string,
  selectedOptions: Array< string | null >,
  updatedAt?: string | null,
  userId: string,
};

export type ModelFormModelConditionInput = {
  and?: Array< ModelFormModelConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  formId?: ModelIDInput | null,
  not?: ModelFormModelConditionInput | null,
  or?: Array< ModelFormModelConditionInput | null > | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type CreateFormModelInput = {
  createdAt?: string | null,
  formId: string,
  title: string,
  updatedAt?: string | null,
  userId: string,
};

export type ModelQuestionModelConditionInput = {
  and?: Array< ModelQuestionModelConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  formId?: ModelIDInput | null,
  not?: ModelQuestionModelConditionInput | null,
  options?: ModelStringInput | null,
  or?: Array< ModelQuestionModelConditionInput | null > | null,
  question?: ModelStringInput | null,
  questionId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type CreateQuestionModelInput = {
  createdAt?: string | null,
  formId: string,
  options: Array< string | null >,
  question: string,
  questionId: string,
  updatedAt?: string | null,
  userId: string,
};

export type ModelUserModelConditionInput = {
  and?: Array< ModelUserModelConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstname?: ModelStringInput | null,
  lastname?: ModelStringInput | null,
  not?: ModelUserModelConditionInput | null,
  or?: Array< ModelUserModelConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type CreateUserModelInput = {
  createdAt?: string | null,
  email: string,
  firstname?: string | null,
  lastname?: string | null,
  updatedAt?: string | null,
  userId: string,
};

export type DeleteAnswerModelInput = {
  answerId: string,
};

export type DeleteFormModelInput = {
  formId: string,
};

export type DeleteQuestionModelInput = {
  questionId: string,
};

export type DeleteUserModelInput = {
  userId: string,
};

export type UpdateAnswerModelInput = {
  answerId: string,
  createdAt?: string | null,
  questionId?: string | null,
  selectedOptions?: Array< string | null > | null,
  updatedAt?: string | null,
  userId?: string | null,
};

export type UpdateFormModelInput = {
  createdAt?: string | null,
  formId: string,
  title?: string | null,
  updatedAt?: string | null,
  userId?: string | null,
};

export type UpdateQuestionModelInput = {
  createdAt?: string | null,
  formId?: string | null,
  options?: Array< string | null > | null,
  question?: string | null,
  questionId: string,
  updatedAt?: string | null,
  userId?: string | null,
};

export type UpdateUserModelInput = {
  createdAt?: string | null,
  email?: string | null,
  firstname?: string | null,
  lastname?: string | null,
  updatedAt?: string | null,
  userId: string,
};

export type ModelSubscriptionAnswerModelFilterInput = {
  and?: Array< ModelSubscriptionAnswerModelFilterInput | null > | null,
  answerId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionAnswerModelFilterInput | null > | null,
  questionId?: ModelSubscriptionIDInput | null,
  selectedOptions?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFormModelFilterInput = {
  and?: Array< ModelSubscriptionFormModelFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  formId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionFormModelFilterInput | null > | null,
  title?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionQuestionModelFilterInput = {
  and?: Array< ModelSubscriptionQuestionModelFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  formId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  options?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionQuestionModelFilterInput | null > | null,
  question?: ModelSubscriptionStringInput | null,
  questionId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionUserModelFilterInput = {
  and?: Array< ModelSubscriptionUserModelFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  firstname?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  lastname?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionUserModelFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
};

export type GetAnswerModelQueryVariables = {
  answerId: string,
};

export type GetAnswerModelQuery = {
  getAnswerModel?:  {
    __typename: "answerModel",
    answerId: string,
    answeredby?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    createdAt?: string | null,
    questionId: string,
    questions?:  {
      __typename: "questionModel",
      createdAt?: string | null,
      formId: string,
      options: Array< string | null >,
      question: string,
      questionId: string,
      updatedAt?: string | null,
      userId: string,
    } | null,
    selectedOptions: Array< string | null >,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type GetFormModelQueryVariables = {
  formId: string,
};

export type GetFormModelQuery = {
  getFormModel?:  {
    __typename: "formModel",
    createdAt?: string | null,
    createdBy?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    formId: string,
    formQuestions?:  {
      __typename: "ModelquestionModelConnection",
      nextToken?: string | null,
    } | null,
    title: string,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type GetQuestionModelQueryVariables = {
  questionId: string,
};

export type GetQuestionModelQuery = {
  getQuestionModel?:  {
    __typename: "questionModel",
    answers?:  {
      __typename: "ModelanswerModelConnection",
      nextToken?: string | null,
    } | null,
    askedby?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    createdAt?: string | null,
    form?:  {
      __typename: "formModel",
      createdAt?: string | null,
      formId: string,
      title: string,
      updatedAt?: string | null,
      userId: string,
    } | null,
    formId: string,
    options: Array< string | null >,
    question: string,
    questionId: string,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type GetUserModelQueryVariables = {
  userId: string,
};

export type GetUserModelQuery = {
  getUserModel?:  {
    __typename: "userModel",
    answers?:  {
      __typename: "ModelanswerModelConnection",
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    email: string,
    firstname?: string | null,
    forms?:  {
      __typename: "ModelformModelConnection",
      nextToken?: string | null,
    } | null,
    lastname?: string | null,
    questions?:  {
      __typename: "ModelquestionModelConnection",
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type ListAnswerModelsQueryVariables = {
  answerId?: string | null,
  filter?: ModelAnswerModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListAnswerModelsQuery = {
  listAnswerModels?:  {
    __typename: "ModelAnswerModelConnection",
    items:  Array< {
      __typename: "answerModel",
      answerId: string,
      createdAt?: string | null,
      questionId: string,
      selectedOptions: Array< string | null >,
      updatedAt?: string | null,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListFormModelsQueryVariables = {
  filter?: ModelFormModelFilterInput | null,
  formId?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListFormModelsQuery = {
  listFormModels?:  {
    __typename: "ModelFormModelConnection",
    items:  Array< {
      id: string | undefined;
      __typename: "formModel",
      createdAt?: string | null,
      formId: string,
      title: string,
      updatedAt?: string | null,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListQuestionModelByFormIdQueryVariables = {
  filter?: ModelquestionModelFilterInput | null,
  formId: string,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListQuestionModelByFormIdQuery = {
  listQuestionModelByFormId?:  {
    __typename: "ModelquestionModelConnection",
    items:  Array< {
      __typename: "questionModel",
      createdAt?: string | null,
      formId: string,
      options: Array< string | null >,
      question: string,
      questionId: string,
      updatedAt?: string | null,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListQuestionModelsQueryVariables = {
  filter?: ModelQuestionModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  questionId?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListQuestionModelsQuery = {
  listQuestionModels?:  {
    __typename: "ModelQuestionModelConnection",
    items:  Array< {
      __typename: "questionModel",
      createdAt?: string | null,
      formId: string,
      options: Array< string | null >,
      question: string,
      questionId: string,
      updatedAt?: string | null,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUserModelsQueryVariables = {
  filter?: ModelUserModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  userId?: string | null,
};

export type ListUserModelsQuery = {
  listUserModels?:  {
    __typename: "ModelUserModelConnection",
    items:  Array< {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateAnswerModelMutationVariables = {
  condition?: ModelAnswerModelConditionInput | null,
  input: CreateAnswerModelInput,
};

export type CreateAnswerModelMutation = {
  createAnswerModel?:  {
    __typename: "answerModel",
    answerId: string,
    answeredby?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    createdAt?: string | null,
    questionId: string,
    questions?:  {
      __typename: "questionModel",
      createdAt?: string | null,
      formId: string,
      options: Array< string | null >,
      question: string,
      questionId: string,
      updatedAt?: string | null,
      userId: string,
    } | null,
    selectedOptions: Array< string | null >,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type CreateFormModelMutationVariables = {
  condition?: ModelFormModelConditionInput | null,
  input: CreateFormModelInput,
};

export type CreateFormModelMutation = {
  createFormModel?:  {
    __typename: "formModel",
    createdAt?: string | null,
    createdBy?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    formId: string,
    formQuestions?:  {
      __typename: "ModelquestionModelConnection",
      nextToken?: string | null,
    } | null,
    title: string,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type CreateQuestionModelMutationVariables = {
  condition?: ModelQuestionModelConditionInput | null,
  input: CreateQuestionModelInput,
};

export type CreateQuestionModelMutation = {
  createQuestionModel?:  {
    __typename: "questionModel",
    answers?:  {
      __typename: "ModelanswerModelConnection",
      nextToken?: string | null,
    } | null,
    askedby?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    createdAt?: string | null,
    form?:  {
      __typename: "formModel",
      createdAt?: string | null,
      formId: string,
      title: string,
      updatedAt?: string | null,
      userId: string,
    } | null,
    formId: string,
    options: Array< string | null >,
    question: string,
    questionId: string,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type CreateUserModelMutationVariables = {
  condition?: ModelUserModelConditionInput | null,
  input: CreateUserModelInput,
};

export type CreateUserModelMutation = {
  createUserModel?:  {
    __typename: "userModel",
    answers?:  {
      __typename: "ModelanswerModelConnection",
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    email: string,
    firstname?: string | null,
    forms?:  {
      __typename: "ModelformModelConnection",
      nextToken?: string | null,
    } | null,
    lastname?: string | null,
    questions?:  {
      __typename: "ModelquestionModelConnection",
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type DeleteAnswerModelMutationVariables = {
  condition?: ModelAnswerModelConditionInput | null,
  input: DeleteAnswerModelInput,
};

export type DeleteAnswerModelMutation = {
  deleteAnswerModel?:  {
    __typename: "answerModel",
    answerId: string,
    answeredby?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    createdAt?: string | null,
    questionId: string,
    questions?:  {
      __typename: "questionModel",
      createdAt?: string | null,
      formId: string,
      options: Array< string | null >,
      question: string,
      questionId: string,
      updatedAt?: string | null,
      userId: string,
    } | null,
    selectedOptions: Array< string | null >,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type DeleteFormModelMutationVariables = {
  condition?: ModelFormModelConditionInput | null,
  input: DeleteFormModelInput,
};

export type DeleteFormModelMutation = {
  deleteFormModel?:  {
    __typename: "formModel",
    createdAt?: string | null,
    createdBy?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    formId: string,
    formQuestions?:  {
      __typename: "ModelquestionModelConnection",
      nextToken?: string | null,
    } | null,
    title: string,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type DeleteQuestionModelMutationVariables = {
  condition?: ModelQuestionModelConditionInput | null,
  input: DeleteQuestionModelInput,
};

export type DeleteQuestionModelMutation = {
  deleteQuestionModel?:  {
    __typename: "questionModel",
    answers?:  {
      __typename: "ModelanswerModelConnection",
      nextToken?: string | null,
    } | null,
    askedby?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    createdAt?: string | null,
    form?:  {
      __typename: "formModel",
      createdAt?: string | null,
      formId: string,
      title: string,
      updatedAt?: string | null,
      userId: string,
    } | null,
    formId: string,
    options: Array< string | null >,
    question: string,
    questionId: string,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type DeleteUserModelMutationVariables = {
  condition?: ModelUserModelConditionInput | null,
  input: DeleteUserModelInput,
};

export type DeleteUserModelMutation = {
  deleteUserModel?:  {
    __typename: "userModel",
    answers?:  {
      __typename: "ModelanswerModelConnection",
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    email: string,
    firstname?: string | null,
    forms?:  {
      __typename: "ModelformModelConnection",
      nextToken?: string | null,
    } | null,
    lastname?: string | null,
    questions?:  {
      __typename: "ModelquestionModelConnection",
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type UpdateAnswerModelMutationVariables = {
  condition?: ModelAnswerModelConditionInput | null,
  input: UpdateAnswerModelInput,
};

export type UpdateAnswerModelMutation = {
  updateAnswerModel?:  {
    __typename: "answerModel",
    answerId: string,
    answeredby?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    createdAt?: string | null,
    questionId: string,
    questions?:  {
      __typename: "questionModel",
      createdAt?: string | null,
      formId: string,
      options: Array< string | null >,
      question: string,
      questionId: string,
      updatedAt?: string | null,
      userId: string,
    } | null,
    selectedOptions: Array< string | null >,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type UpdateFormModelMutationVariables = {
  condition?: ModelFormModelConditionInput | null,
  input: UpdateFormModelInput,
};

export type UpdateFormModelMutation = {
  updateFormModel?:  {
    __typename: "formModel",
    createdAt?: string | null,
    createdBy?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    formId: string,
    formQuestions?:  {
      __typename: "ModelquestionModelConnection",
      nextToken?: string | null,
    } | null,
    title: string,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type UpdateQuestionModelMutationVariables = {
  condition?: ModelQuestionModelConditionInput | null,
  input: UpdateQuestionModelInput,
};

export type UpdateQuestionModelMutation = {
  updateQuestionModel?:  {
    __typename: "questionModel",
    answers?:  {
      __typename: "ModelanswerModelConnection",
      nextToken?: string | null,
    } | null,
    askedby?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    createdAt?: string | null,
    form?:  {
      __typename: "formModel",
      createdAt?: string | null,
      formId: string,
      title: string,
      updatedAt?: string | null,
      userId: string,
    } | null,
    formId: string,
    options: Array< string | null >,
    question: string,
    questionId: string,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type UpdateUserModelMutationVariables = {
  condition?: ModelUserModelConditionInput | null,
  input: UpdateUserModelInput,
};

export type UpdateUserModelMutation = {
  updateUserModel?:  {
    __typename: "userModel",
    answers?:  {
      __typename: "ModelanswerModelConnection",
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    email: string,
    firstname?: string | null,
    forms?:  {
      __typename: "ModelformModelConnection",
      nextToken?: string | null,
    } | null,
    lastname?: string | null,
    questions?:  {
      __typename: "ModelquestionModelConnection",
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnCreateAnswerModelSubscriptionVariables = {
  filter?: ModelSubscriptionAnswerModelFilterInput | null,
};

export type OnCreateAnswerModelSubscription = {
  onCreateAnswerModel?:  {
    __typename: "answerModel",
    answerId: string,
    answeredby?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    createdAt?: string | null,
    questionId: string,
    questions?:  {
      __typename: "questionModel",
      createdAt?: string | null,
      formId: string,
      options: Array< string | null >,
      question: string,
      questionId: string,
      updatedAt?: string | null,
      userId: string,
    } | null,
    selectedOptions: Array< string | null >,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnCreateFormModelSubscriptionVariables = {
  filter?: ModelSubscriptionFormModelFilterInput | null,
};

export type OnCreateFormModelSubscription = {
  onCreateFormModel?:  {
    __typename: "formModel",
    createdAt?: string | null,
    createdBy?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    formId: string,
    formQuestions?:  {
      __typename: "ModelquestionModelConnection",
      nextToken?: string | null,
    } | null,
    title: string,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnCreateQuestionModelSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionModelFilterInput | null,
};

export type OnCreateQuestionModelSubscription = {
  onCreateQuestionModel?:  {
    __typename: "questionModel",
    answers?:  {
      __typename: "ModelanswerModelConnection",
      nextToken?: string | null,
    } | null,
    askedby?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    createdAt?: string | null,
    form?:  {
      __typename: "formModel",
      createdAt?: string | null,
      formId: string,
      title: string,
      updatedAt?: string | null,
      userId: string,
    } | null,
    formId: string,
    options: Array< string | null >,
    question: string,
    questionId: string,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnCreateUserModelSubscriptionVariables = {
  filter?: ModelSubscriptionUserModelFilterInput | null,
};

export type OnCreateUserModelSubscription = {
  onCreateUserModel?:  {
    __typename: "userModel",
    answers?:  {
      __typename: "ModelanswerModelConnection",
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    email: string,
    firstname?: string | null,
    forms?:  {
      __typename: "ModelformModelConnection",
      nextToken?: string | null,
    } | null,
    lastname?: string | null,
    questions?:  {
      __typename: "ModelquestionModelConnection",
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnDeleteAnswerModelSubscriptionVariables = {
  filter?: ModelSubscriptionAnswerModelFilterInput | null,
};

export type OnDeleteAnswerModelSubscription = {
  onDeleteAnswerModel?:  {
    __typename: "answerModel",
    answerId: string,
    answeredby?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    createdAt?: string | null,
    questionId: string,
    questions?:  {
      __typename: "questionModel",
      createdAt?: string | null,
      formId: string,
      options: Array< string | null >,
      question: string,
      questionId: string,
      updatedAt?: string | null,
      userId: string,
    } | null,
    selectedOptions: Array< string | null >,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnDeleteFormModelSubscriptionVariables = {
  filter?: ModelSubscriptionFormModelFilterInput | null,
};

export type OnDeleteFormModelSubscription = {
  onDeleteFormModel?:  {
    __typename: "formModel",
    createdAt?: string | null,
    createdBy?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    formId: string,
    formQuestions?:  {
      __typename: "ModelquestionModelConnection",
      nextToken?: string | null,
    } | null,
    title: string,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnDeleteQuestionModelSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionModelFilterInput | null,
};

export type OnDeleteQuestionModelSubscription = {
  onDeleteQuestionModel?:  {
    __typename: "questionModel",
    answers?:  {
      __typename: "ModelanswerModelConnection",
      nextToken?: string | null,
    } | null,
    askedby?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    createdAt?: string | null,
    form?:  {
      __typename: "formModel",
      createdAt?: string | null,
      formId: string,
      title: string,
      updatedAt?: string | null,
      userId: string,
    } | null,
    formId: string,
    options: Array< string | null >,
    question: string,
    questionId: string,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnDeleteUserModelSubscriptionVariables = {
  filter?: ModelSubscriptionUserModelFilterInput | null,
};

export type OnDeleteUserModelSubscription = {
  onDeleteUserModel?:  {
    __typename: "userModel",
    answers?:  {
      __typename: "ModelanswerModelConnection",
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    email: string,
    firstname?: string | null,
    forms?:  {
      __typename: "ModelformModelConnection",
      nextToken?: string | null,
    } | null,
    lastname?: string | null,
    questions?:  {
      __typename: "ModelquestionModelConnection",
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnUpdateAnswerModelSubscriptionVariables = {
  filter?: ModelSubscriptionAnswerModelFilterInput | null,
};

export type OnUpdateAnswerModelSubscription = {
  onUpdateAnswerModel?:  {
    __typename: "answerModel",
    answerId: string,
    answeredby?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    createdAt?: string | null,
    questionId: string,
    questions?:  {
      __typename: "questionModel",
      createdAt?: string | null,
      formId: string,
      options: Array< string | null >,
      question: string,
      questionId: string,
      updatedAt?: string | null,
      userId: string,
    } | null,
    selectedOptions: Array< string | null >,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnUpdateFormModelSubscriptionVariables = {
  filter?: ModelSubscriptionFormModelFilterInput | null,
};

export type OnUpdateFormModelSubscription = {
  onUpdateFormModel?:  {
    __typename: "formModel",
    createdAt?: string | null,
    createdBy?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    formId: string,
    formQuestions?:  {
      __typename: "ModelquestionModelConnection",
      nextToken?: string | null,
    } | null,
    title: string,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnUpdateQuestionModelSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionModelFilterInput | null,
};

export type OnUpdateQuestionModelSubscription = {
  onUpdateQuestionModel?:  {
    __typename: "questionModel",
    answers?:  {
      __typename: "ModelanswerModelConnection",
      nextToken?: string | null,
    } | null,
    askedby?:  {
      __typename: "userModel",
      createdAt?: string | null,
      email: string,
      firstname?: string | null,
      lastname?: string | null,
      updatedAt?: string | null,
      userId: string,
    } | null,
    createdAt?: string | null,
    form?:  {
      __typename: "formModel",
      createdAt?: string | null,
      formId: string,
      title: string,
      updatedAt?: string | null,
      userId: string,
    } | null,
    formId: string,
    options: Array< string | null >,
    question: string,
    questionId: string,
    updatedAt?: string | null,
    userId: string,
  } | null,
};

export type OnUpdateUserModelSubscriptionVariables = {
  filter?: ModelSubscriptionUserModelFilterInput | null,
};

export type OnUpdateUserModelSubscription = {
  onUpdateUserModel?:  {
    __typename: "userModel",
    answers?:  {
      __typename: "ModelanswerModelConnection",
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    email: string,
    firstname?: string | null,
    forms?:  {
      __typename: "ModelformModelConnection",
      nextToken?: string | null,
    } | null,
    lastname?: string | null,
    questions?:  {
      __typename: "ModelquestionModelConnection",
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    userId: string,
  } | null,
};
