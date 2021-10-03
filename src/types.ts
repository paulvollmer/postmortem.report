export type FixMeAny = any

export type ActionItems = Array<ActionItem>;

export type ActionItem = {
  actionItem: string;
  type: string;
  owner: string;
  bug: string;
}

export type Timeline = Array<TimelineItem>;

export type TimelineItem = {
  time: string;
  person: string;
  message: string;
};

export type PostmortemReport = {
  meta: PostmortemReportMeta;
  lessonsLearned: PostmortemReportLessonsLearned;
  timeline: Timeline;
  supportInformation: string;
}

export type PostmortemReportMeta = {
  reportTitle: string;
  date: Date | null;
  status: string;
  authors: string;
  summary: string;
  impact: string;
  rootCauses: string;
  trigger: string;
  resolution: string;
  detection: string;
}

export type PostmortemReportLessonsLearned = {
  whatWentWell: string;
  whatWentWrong: string;
  whereWeGotLucky: string;
}
