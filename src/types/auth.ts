export type SignupProps = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  phrase?: string;
  authKey?: string;
  otp?: number;
  languageCode?: string;
  languageName?: string;
  weekStartDayKey?: string;
  weekStartDayValue?: string;
  countryKey?: string;
  countryValue?: string;
  timezoneKey?: string;
  timezoneValue?: string;
  employeesKey?: string;
  employeesValue?: string;
  primaryColor?: string;
  companyName?: string;
  secondaryColor?: string;
  doryUseKind?: string;
  companyLogoFile?: File;
  userPhotoFile?: File;
};

export interface UserProps extends SignupProps {
  userId?: number;
  username?: string;
}

export type UserResponse = {
  userId: number;
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  photoNormal: string;
  photoThumb: string;
  companyId: number;
  companyName: string;
  multiLanguageStatus: number;
  defaultLanguageCode: string;
  defaultLanguageName: string;
  siteLanguageCode: string;
  siteLanguageName: string;
  teamLanguageCode: string;
  teamLanguageName: string;
  weekStartDayKey: number;
  weekStartDayValue: string;
  countryKey: string;
  countryValue: string;
  timezoneKey: string;
  timezoneValue: string;
  employeesKey: string;
  employeesValue: string;
  primaryColor: string;
  secondaryColor: string;
  doryUseKind: number;
  gdprStatus: number;
  siteUrl: string;
  inbox: string;
  companyLogoNormal: string;
  companyLogoThumb: string;
};
