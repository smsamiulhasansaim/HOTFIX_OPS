
export enum BugCategory {
  LAYOUT = 'Layout',
  JAVASCRIPT = 'JavaScript',
  FORM = 'Form',
  BACKEND = 'Backend',
  RESPONSIVENESS = 'Responsiveness'
}

export enum BugStatus {
  CRITICAL = 'Critical',
  FIXED = 'Fixed',
  PENDING = 'Pending'
}

export interface BugTask {
  id: string;
  title: string;
  category: BugCategory;
  description: string;
  status: BugStatus;
  technicalDetails: string;
  fixCode?: string;
}

export interface AppState {
  tasks: BugTask[];
  activeTaskId: string | null;
  isAnalyzing: boolean;
  isApplyingFix: boolean;
  history: string[];
}
