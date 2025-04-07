export type ReportType = {
  _id: string;
  pageName: string;
  email: string | null;
  report: string;
  status?: number;
};

export type ReportItemsType = {
  items: ReportType[];
};
