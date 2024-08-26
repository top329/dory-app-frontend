import { Option, YEAR_BASE } from '@/types/global';
import { AES } from 'crypto-js';

export const validateToken = (expireDate: number) => {
  return expireDate > Date.now() / 1000;
};

export const cryptoEncryptPwd = (password: string) => {
  const phrase = new Date().getTime().toString();
  return { pwd: AES.encrypt(password, phrase).toString(), phrase };
};

export const blobToFile = (blob: Blob, fileName: string) => {
  return new File([blob], fileName, { lastModified: new Date().getTime(), type: blob.type });
};

export const calcYears = () => {
  const currYear = new Date().getFullYear();
  const retValue: Option[] = [
    {
      label: currYear.toString(),
      value: currYear.toString(),
    },
  ];

  const values = Array.from({ length: currYear - parseInt(YEAR_BASE, 10) }, (_, i) => {
    return {
      label: (currYear - (i + 1)).toString(),
      value: (currYear - (i + 1)).toString(),
    };
  });

  return [...retValue, ...values];
};
