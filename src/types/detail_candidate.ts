export type CandidateOverviewResponse = {
    email: string,
    phoneCode: string,
    phoneNumber: string,
    socials: string,
    resumeFileUrl: string,
    coverLetter: string,
    coverLetterFileUrl: string,
    answers: {
      id: number,
      candidateId: number,
      jobId: number,
      answer: string
    }
  };
  
  export type CandidateEvaluationCompletedResponse = {
    evaluationId: number,
    evaluationKind: number,
    evaluationLabel: string,
    memberId: number,
    memberName: string,
    memberPhotoNormalUrl: string,
    memberPhotoThumbUrl: string,
    createDate: string,
    summary: string,
    content: string
  }
  
  export type CandidateActivityResponse = {
    date : string,
    contents: {
      kindId: number;
      actionKindId: number;
      occurKind: number;
      jobCandidateStatus: number;
      jobId: number;
      userName: string;
      candidateId: number;
      photoNormalUrl: string;
      photoThumbUrl: string;
      title: string;
      content: string;
      time: string
    }
  }