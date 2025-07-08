import { questionModel } from "@/app/graphql/API";

export type DisplayProps = {
   showForm: boolean;
   onSubmitSuccess: () => void;
 };

export type Question = {
  questionId : string;
  question: string;
  options: string[];
  userId?: string;
  formId?: string;
};

export type QLProps = {
  questions: Question[];
  loading: boolean;
  onSubmitSuccess?: () => void;
};


export type ButtonProps = {
  onShowForm: () => void;
  onSelectFormId: (formId: string) => void;
  onViewUserAnswers: (userId: string) => void;
};

export type ULProps = {
  questions: Question[];
  loading: boolean;
  onBackToWelcome: () => void;
};

export type SideBarProps = {
  onShowForm: () => void;
  onSelectFormId: (formId: string) => void;
};

// ...other imports

export type MButtonProps = {
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
};


export type FAMProps = {
  formId: string;
  userId: string;
  onClose: () => void;
};

export type FormData = {
  email: string;
  password: string;
};

export type UserLProps = {
  userId: string;
  onBackToDashboard: () => void;
};

export type ULFormData = {
  title: string;
  questions: questionModel[];
};

