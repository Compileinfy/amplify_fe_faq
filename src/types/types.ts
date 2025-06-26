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
};

export type ButtonProps = {
  onShowForm: () => void;
  onSelectFormId: (formId: string) => void;
};

export type ULProps = {
  questions: Question[];
  loading: boolean;
  onBackToWelcome: () => void; // Add this prop
};

export type SideBarProps = {
  onShowForm: () => void;
  onSelectFormId: (formId: string) => void;
};
