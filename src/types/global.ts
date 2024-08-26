export const YEAR_BASE = '2023';

export interface ApiResponse<T> {
  data: T;
  code: number;
  msg: string;
  token: string;
  expireDate: number;
  value?: string;
}

export interface ListDataResponse<T> {
  totalCnt: number;
  selectPageNumber: number;
  list: T;
}

export interface FormProps {
  onSubmit: (data: any) => Promise<void>;
  onResent?: () => Promise<void>;
  loading?: boolean;
  error?: number;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export type MenuItem = {
  label: React.ReactNode;
  key: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: {
    label: React.ReactNode;
    key: string;
  }[];
};

export type SpinnerProps = {
  loading: boolean;
  size?: 'small' | 'default' | 'large';
  opacity?: number;
  background?: string;
};

export interface Option {
  id?: number;
  icon?: React.ReactNode;
  label?: string | JSX.Element;
  value?: string;
  disabled?: boolean;
  offset?: number;
  altName?: string;
  country?: string;
  code?: string;
  content?: Array<any>;
  color?: string;
  checked?: boolean;
}

export type FileType = {
  id: string;
  fileUrl: string;
  originalName: string;
  size: number;
};

export type AnswerType = {
  id?: number;
  answer: string;
};

export type LanguageType = {
  id?: number;
  languageCode?: string;
  languageName?: string;
  nativeName?: string;
  supportStatus?: number;
  enabled?: number;
};

export type CurrenciesType = {
  id: number;
  currencyCode: string;
  currencyName: string;
};

export const THINKING_TIME = [
  { label: 'Unlimited', value: '0' },
  { label: '15s', value: '15' },
  { label: '30s', value: '30' },
  { label: '45s', value: '45' },
  { label: '1m', value: '60' },
  { label: '1.5m', value: '90' },
  { label: '2m', value: '120' },
  { label: '3m', value: '180' },
  { label: '4m', value: '240' },
];

export const ANSWER_TIME = [
  { label: '15s', value: '15' },
  { label: '30s', value: '30' },
  { label: '40s', value: '40' },
  { label: '45s', value: '45' },
  { label: '50s', value: '50' },
  { label: '1m', value: '60' },
  { label: '1.5m', value: '90' },
  { label: '2m', value: '120' },
  { label: '3m', value: '180' },
  { label: '4m', value: '240' },
  { label: '5m', value: '300' },
  { label: '10m', value: '600' },
];

export const TOTAL_TAKES = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
];

export const COUNTRIES = [
  { label: 'United States', value: 'US' },
  { label: 'Australia', value: 'AU' },
  { label: 'Austria', value: 'AT' },
  { label: 'Belgium', value: 'BE' },
  { label: 'Bulgaria', value: 'BG' },
  { label: 'Brazil ', value: 'BR' },
  { label: 'Canada', value: 'CA' },
  { label: 'Cyprus', value: 'CY' },
  { label: 'Czech Republic', value: 'CZ' },
  { label: 'Denmark', value: 'DK' },
  { label: 'Estonia', value: 'EE' },
  { label: 'Finland', value: 'FI' },
  { label: 'France', value: 'FR' },
  { label: 'Germany', value: 'DE' },
  { label: 'Greece', value: 'GR' },
  { label: 'Hong Kong', value: 'HK' },
  { label: 'Hungary', value: 'HU' },
  { label: 'India', value: 'IN' },
  { label: 'Ireland', value: 'IE' },
  { label: 'Italy', value: 'IT' },
  { label: 'Japan', value: 'JP' },
  { label: 'Latvia', value: 'LV' },
  { label: 'Lithuania', value: 'LT' },
  { label: 'Luxembourg', value: 'LU' },
  { label: 'Malaysia', value: 'MY' },
  { label: 'Malta', value: 'MT' },
  { label: 'Mexico ', value: 'MX' },
  { label: 'Netherlands', value: 'NL' },
  { label: 'New Zealand', value: 'NZ' },
  { label: 'Norway', value: 'NO' },
  { label: 'Philippines', value: 'PH' },
  { label: 'Poland', value: 'PL' },
  { label: 'Portugal', value: 'PT' },
  { label: 'Romania', value: 'RO' },
  { label: 'Singapore', value: 'SG' },
  { label: 'Slovakia', value: 'SK' },
  { label: 'Slovenia', value: 'SI' },
  { label: 'Spain', value: 'ES' },
  { label: 'Sweden', value: 'SE' },
  { label: 'Switzerland', value: 'CH' },
  { label: 'United Kingdom', value: 'GB' },
];

export const WEEKS = [
  { value: '0', label: 'Sunday' },
  { value: '1', label: 'Monday' },
  { value: '2', label: 'Tuesday' },
  { value: '3', label: 'Wednesday' },
  { value: '4', label: 'Thursday' },
  { value: '5', label: 'Friday' },
  { value: '6', label: 'Saturday' },
];

export const SCHEDULE = [
  {
    label: 'After Initial Invitation',
    value: '1',
  },
];

export const SCHEDULE_TIME = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
];

export const PIPLINE_SETTING_ITEMS = [
  {
    label: 'Name',
    checked: true,
    disabled: true,
  },
  {
    label: 'Profile created',
    checked: true,
    disabled: false,
  },
  {
    label: 'Evaluation score',
    checked: true,
    disabled: false,
  },
  {
    label: 'Notes',
    checked: true,
    disabled: false,
  },
  {
    label: 'Tasks',
    checked: true,
    disabled: false,
  },
  {
    label: 'Upcoming events',
    checked: true,
    disabled: false,
  },
  {
    label: 'Overdue',
    checked: true,
    disabled: false,
  },
  {
    label: 'Tags',
    checked: false,
    disabled: false,
  },
  {
    label: 'Intergrations',
    checked: true,
    disabled: false,
  },
  {
    label: 'Last activity',
    checked: false,
    disabled: false,
  },
  {
    label: 'Social media',
    checked: false,
    disabled: false,
  },
];

export const PHONE_CODE: Option[] = [
  {
    label: 'AF',
    code: '+93',
    country: 'Afghanistan',
  },
  {
    label: 'AL',
    code: '+355',
    country: 'Albania',
  },
  {
    label: 'DZ',
    code: '+213',
    country: 'Algeria',
  },
  {
    label: 'AS',
    code: '+1',
    country: 'American Samoa',
  },
  {
    label: 'AD',
    code: '+376',
    country: 'Andorra',
  },
  {
    label: 'AO',
    code: '+244',
    country: 'Angola',
  },
  {
    label: 'AI',
    code: '+1',
    country: 'Anguilla',
  },
  {
    label: 'AG',
    code: '+1',
    country: 'Antigua and Barbuda',
  },
  {
    label: 'AR',
    code: '+54',
    country: 'Argentina',
  },
  {
    label: 'AM',
    code: '+374',
    country: 'Armenia',
  },
  {
    label: 'AW',
    code: '+297',
    country: 'Aruba',
  },
  {
    label: 'AU',
    code: '+61',
    country: 'Australia',
  },
  {
    label: 'AT',
    code: '+43',
    country: 'Austria',
  },
  {
    label: 'AZ',
    code: '+994',
    country: 'Azerbaijan',
  },
  {
    label: 'BS',
    code: '+1',
    country: 'Bahamas',
  },
  {
    label: 'BH',
    code: '+973',
    country: 'Bahrain',
  },
  {
    label: 'BD',
    code: '+880',
    country: 'Bangladesh',
  },
  {
    label: 'BB',
    code: '+1',
    country: 'Barbados',
  },
  {
    label: 'BY',
    code: '+375',
    country: 'Belarus',
  },
  {
    label: 'BE',
    code: '+32',
    country: 'Belgium',
  },
  {
    label: 'BZ',
    code: '+501',
    country: 'Belize',
  },
  {
    label: 'BJ',
    code: '+229',
    country: 'Benin',
  },
  {
    label: 'BM',
    code: '+1',
    country: 'Bermuda',
  },
  {
    label: 'BT',
    code: '+975',
    country: 'Bhutan',
  },
  {
    label: 'BO',
    code: '+591',
    country: 'Bolivia',
  },
  {
    label: 'BA',
    code: '+387',
    country: 'Bosnia and Herzegovina',
  },
  {
    label: 'BW',
    code: '+267',
    country: 'Botswana',
  },
  {
    label: 'BR',
    code: '+55',
    country: 'Brazil',
  },
  {
    label: 'IO',
    code: '+246',
    country: 'British Indian Ocean Territory',
  },
  {
    label: 'VG',
    code: '+1',
    country: 'British Virgin Islands',
  },
  {
    label: 'BN',
    code: '+673',
    country: 'Brunei',
  },
  {
    label: 'BG',
    code: '+359',
    country: 'Bulgaria',
  },
  {
    label: 'BF',
    code: '+226',
    country: 'Burkina Faso',
  },
  {
    label: 'BI',
    code: '+257',
    country: 'Burundi',
  },
  {
    label: 'KH',
    code: '+855',
    country: 'Cambodia',
  },
  {
    label: 'CM',
    code: '+237',
    country: 'Cameroon',
  },
  {
    label: 'CA',
    code: '+1',
    country: 'Canada',
  },
  {
    label: 'CV',
    code: '+238',
    country: 'Cape Verde',
  },
  {
    label: 'KY',
    code: '+1',
    country: 'Cayman Islands',
  },
  {
    label: 'CF',
    code: '+236',
    country: 'Central African Republic',
  },
  {
    label: 'TD',
    code: '+235',
    country: 'Chad',
  },
  {
    label: 'CL',
    code: '+56',
    country: 'Chile',
  },
  {
    label: 'CN',
    code: '+86',
    country: 'China',
  },
  {
    label: 'CO',
    code: '+57',
    country: 'Colombia',
  },
  {
    label: 'KM',
    code: '+269',
    country: 'Comoros',
  },
  {
    label: 'CK',
    code: '+682',
    country: 'Cook Islands',
  },
  {
    label: 'CR',
    code: '+506',
    country: 'Costa Rica',
  },
  {
    label: 'HR',
    code: '+385',
    country: 'Croatia',
  },
  {
    label: 'CU',
    code: '+53',
    country: 'Cuba',
  },
  {
    label: 'CW',
    code: '+599',
    country: 'Curacao',
  },
  {
    label: 'CY',
    code: '+357',
    country: 'Cyprus',
  },
  {
    label: 'CZ',
    code: '+420',
    country: 'Czechia',
  },
  {
    label: 'DK',
    code: '+45',
    country: 'Denmark',
  },
  {
    label: 'DJ',
    code: '+253',
    country: 'Djibouti',
  },
  {
    label: 'DM',
    code: '+1',
    country: 'Dominica',
  },
  {
    label: 'DO',
    code: '+1',
    country: 'Dominican Republic',
  },
  {
    label: 'EC',
    code: '+593',
    country: 'Ecuador',
  },
  {
    label: 'EG',
    code: '+20',
    country: 'Egypt',
  },
  {
    label: 'SV',
    code: '+503',
    country: 'El Salvador',
  },
  {
    label: 'GQ',
    code: '+240',
    country: 'Equatorial Guinea',
  },
  {
    label: 'ER',
    code: '+291',
    country: 'Eritrea',
  },
  {
    label: 'EE',
    code: '+372',
    country: 'Estonia',
  },
  {
    label: 'ET',
    code: '+251',
    country: 'Ethiopia',
  },
  {
    label: 'FK',
    code: '+500',
    country: 'Falkland Islands',
  },
  {
    label: 'FO',
    code: '+298',
    country: 'Faroe Islands',
  },
  {
    label: 'FJ',
    code: '+679',
    country: 'Fiji',
  },
  {
    label: 'FI',
    code: '+358',
    country: 'Finland',
  },
  {
    label: 'FR',
    code: '+33',
    country: 'France',
  },
  {
    label: 'PF',
    code: '+689',
    country: 'French Polynesia',
  },
  {
    label: 'GA',
    code: '+241',
    country: 'Gabon',
  },
  {
    label: 'GM',
    code: '+220',
    country: 'Gambia',
  },
  {
    label: 'GE',
    code: '+995',
    country: 'Georgia',
  },
  {
    label: 'DE',
    code: '+49',
    country: 'Germany',
  },
  {
    label: 'GH',
    code: '+233',
    country: 'Ghana',
  },
  {
    label: 'GI',
    code: '+350',
    country: 'Gibraltar',
  },
  {
    label: 'GR',
    code: '+30',
    country: 'Greece',
  },
  {
    label: 'GL',
    code: '+299',
    country: 'Greenland',
  },
  {
    label: 'GD',
    code: '+1',
    country: 'Grenada',
  },
  {
    label: 'GU',
    code: '+1',
    country: 'Guam',
  },
  {
    label: 'GT',
    code: '+502',
    country: 'Guatemala',
  },
  {
    label: 'GN',
    code: '+224',
    country: 'Guinea',
  },
  {
    label: 'GW',
    code: '+245',
    country: 'Guinea-Bissau',
  },
  {
    label: 'GY',
    code: '+592',
    country: 'Guyana',
  },
  {
    label: 'HT',
    code: '+509',
    country: 'Haiti',
  },
  {
    label: 'HN',
    code: '+504',
    country: 'Honduras',
  },
  {
    label: 'HK',
    code: '+852',
    country: 'Hong Kong',
  },
  {
    label: 'HU',
    code: '+36',
    country: 'Hungary',
  },
  {
    label: 'IS',
    code: '+354',
    country: 'Iceland',
  },
  {
    label: 'IN',
    code: '+91',
    country: 'India',
  },
  {
    label: 'ID',
    code: '+62',
    country: 'Indonesia',
  },
  {
    label: 'IR',
    code: '+98',
    country: 'Iran',
  },
  {
    label: 'IQ',
    code: '+964',
    country: 'Iraq',
  },
  {
    label: 'IE',
    code: '+353',
    country: 'Ireland',
  },
  {
    label: 'IL',
    code: '+972',
    country: 'Israel',
  },
  {
    label: 'AM',
    code: '+39',
    country: 'IT',
  },
  {
    label: 'JM',
    code: '+1',
    country: 'Jamaica',
  },
  {
    label: 'JP',
    code: '+81',
    country: 'Japan',
  },
  {
    label: 'JO',
    code: '+962',
    country: 'Jordan',
  },
  {
    label: 'KZ',
    code: '+7',
    country: 'Kazakhstan',
  },
  {
    label: 'KE',
    code: '+254',
    country: 'Kenya',
  },
  {
    label: 'KI',
    code: '+686',
    country: 'Kiribati',
  },
  {
    label: 'XK',
    code: '+383',
    country: 'Kosovo',
  },
  {
    label: 'KW',
    code: '+965',
    country: 'Kuwait',
  },
  {
    label: 'KG',
    code: '+996',
    country: 'Kyrgyzstan',
  },
  {
    label: 'LA',
    code: '+856',
    country: 'Laos',
  },
  {
    label: 'LV',
    code: '+371',
    country: 'Latvia',
  },
  {
    label: 'LB',
    code: '+961',
    country: 'Lebanon',
  },
  {
    label: 'LS',
    code: '+266',
    country: 'Lesotho',
  },
  {
    label: 'LR',
    code: '+231',
    country: 'Liberia',
  },
  {
    label: 'LY',
    code: '+218',
    country: 'Libya',
  },
  {
    label: 'LI',
    code: '+423',
    country: 'Liechtenstein',
  },
  {
    label: 'LT',
    code: '+370',
    country: 'Lithuania',
  },
  {
    label: 'LU',
    code: '+352',
    country: 'Luxembourg',
  },
  {
    label: 'MO',
    code: '+853',
    country: 'Macao',
  },
  {
    label: 'MK',
    code: '+389',
    country: 'Macedonia',
  },
  {
    label: 'MG',
    code: '+261',
    country: 'Madagascar',
  },
  {
    label: 'MW',
    code: '+265',
    country: 'Malawi',
  },
  {
    label: 'MY',
    code: '+60',
    country: 'Malaysia',
  },
  {
    label: 'MV',
    code: '+960',
    country: 'Maldives',
  },
  {
    label: 'ML',
    code: '+223',
    country: 'Mali',
  },
  {
    label: 'MT',
    code: '+356',
    country: 'Malta',
  },
  {
    label: 'MH',
    code: '+692',
    country: 'Marshall Islands',
  },
  {
    label: 'MR',
    code: '+222',
    country: 'Mauritania',
  },
  {
    label: 'MU',
    code: '+230',
    country: 'Mauritius',
  },
  {
    label: 'MX',
    code: '+52',
    country: 'Mexico',
  },
  {
    label: 'FM',
    code: '+691',
    country: 'Micronesia',
  },
  {
    label: 'MD',
    code: '+373',
    country: 'Moldova',
  },
  {
    label: 'MC',
    code: '+377',
    country: 'Monaco',
  },
  {
    label: 'MN',
    code: '+976',
    country: 'Mongolia',
  },
  {
    label: 'ME',
    code: '+382',
    country: 'Montenegro',
  },
  {
    label: 'MS',
    code: '+1',
    country: 'Montserrat',
  },
  {
    label: 'MA',
    code: '+212',
    country: 'Morocco',
  },
  {
    label: 'MZ',
    code: '+258',
    country: 'Mozambique',
  },
  {
    label: 'MM',
    code: '+95',
    country: 'Myanmar',
  },
  {
    label: 'NA',
    code: '+264',
    country: 'Namibia',
  },
  {
    label: 'NP',
    code: '+977',
    country: 'Nepal',
  },
  {
    label: 'NL',
    code: '+31',
    country: 'Netherlands',
  },
  {
    label: 'NC',
    code: '+687',
    country: 'New Caledonia',
  },
  {
    label: 'NZ',
    code: '+64',
    country: 'New Zealand',
  },
  {
    label: 'NI',
    code: '+505',
    country: 'Nicaragua',
  },
  {
    label: 'NE',
    code: '+227',
    country: 'Niger',
  },
  {
    label: 'NG',
    code: '+234',
    country: 'Nigeria',
  },
  {
    label: 'NU',
    code: '+683',
    country: 'Niue',
  },
  {
    label: 'KP',
    code: '+850',
    country: 'North Korea',
  },
  {
    label: 'MP',
    code: '+1',
    country: 'Northern Mariana Islands',
  },
  {
    label: 'NO',
    code: '+47',
    country: 'Norway',
  },
  {
    label: 'OM',
    code: '+968',
    country: 'Oman',
  },
  {
    label: 'PK',
    code: '+92',
    country: 'Pakistan',
  },
  {
    label: 'PW',
    code: '+680',
    country: 'Palau',
  },
  {
    label: 'PS',
    code: '+970',
    country: 'Palestine',
  },
  {
    label: 'PA',
    code: '+507',
    country: 'Panama',
  },
  {
    label: 'PG',
    code: '+675',
    country: 'Papua New Guinea',
  },
  {
    label: 'PY',
    code: '+595',
    country: 'Paraguay',
  },
  {
    label: 'PE',
    code: '+51',
    country: 'Peru',
  },
  {
    label: 'PH',
    code: '+63',
    country: 'Philippines',
  },
  {
    label: 'PL',
    code: '+48',
    country: 'Poland',
  },
  {
    label: 'PT',
    code: '+351',
    country: 'Portugal',
  },
  {
    label: 'PR',
    code: '+1',
    country: 'Puerto Rico',
  },
  {
    label: 'QA',
    code: '+974',
    country: 'Qatar',
  },
  {
    label: 'RE',
    code: '+262',
    country: 'Reunion',
  },
  {
    label: 'RO',
    code: '+40',
    country: 'Romania',
  },
  {
    label: 'RU',
    code: '+7',
    country: 'Russia',
  },
  {
    label: 'RW',
    code: '+250',
    country: 'Rwanda',
  },
  {
    label: 'AM',
    code: '+685',
    country: 'WS',
  },
  {
    label: 'SM',
    code: '+378',
    country: 'San Marino',
  },
  {
    label: 'ST',
    code: '+239',
    country: 'Sao Tome and Principe',
  },
  {
    label: 'SA',
    code: '+966',
    country: 'Saudi Arabia',
  },
  {
    label: 'SN',
    code: '+221',
    country: 'Senegal',
  },
  {
    label: 'RS',
    code: '+381',
    country: 'Serbia',
  },
  {
    label: 'SC',
    code: '+248',
    country: 'Seychelles',
  },
  {
    label: 'SL',
    code: '+232',
    country: 'Sierra Leone',
  },
  {
    label: 'SG',
    code: '+65',
    country: 'Singapore',
  },
  {
    label: 'SX',
    code: '+1',
    country: 'Sint Maarten',
  },
  {
    label: 'SK',
    code: '+421',
    country: 'Slovakia',
  },
  {
    label: 'SI',
    code: '+386',
    country: 'Slovenia',
  },
  {
    label: 'SB',
    code: '+677',
    country: 'Solomon Islands',
  },
  {
    label: 'SO',
    code: '+252',
    country: 'Somalia',
  },
  {
    label: 'ZA',
    code: '+27',
    country: 'South Africa',
  },
  {
    label: 'KR',
    code: '+82',
    country: 'South Korea',
  },
  {
    label: 'SS',
    code: '+211',
    country: 'South Sudan',
  },
  {
    label: 'ES',
    code: '+34',
    country: 'Spain',
  },
  {
    label: 'LK',
    code: '+94',
    country: 'Sri Lanka',
  },
  {
    label: 'SD',
    code: '+249',
    country: 'Sudan',
  },
  {
    label: 'SR',
    code: '+597',
    country: 'Suriname',
  },
  {
    label: 'SE',
    code: '+46',
    country: 'Sweden',
  },
  {
    label: 'CH',
    code: '+41',
    country: 'Switzerland',
  },
  {
    label: 'SY',
    code: '+963',
    country: 'Syria',
  },
  {
    label: 'TW',
    code: '+886',
    country: 'Taiwan',
  },
  {
    label: 'TJ',
    code: '+992',
    country: 'Tajikistan',
  },
  {
    label: 'TZ',
    code: '+255',
    country: 'Tanzania',
  },
  {
    label: 'TH',
    code: '+66',
    country: 'Thailand',
  },
  {
    label: 'TG',
    code: '+228',
    country: 'Togo',
  },
  {
    label: 'TK',
    code: '+690',
    country: 'Tokelau',
  },
  {
    label: 'TO',
    code: '+676',
    country: 'Tonga',
  },
  {
    label: 'TT',
    code: '+1',
    country: 'Trinidad and Tobago',
  },
  {
    label: 'TN',
    code: '+216',
    country: 'Tunisia',
  },
  {
    label: 'TR',
    code: '+90',
    country: 'Turkey',
  },
  {
    label: 'TM',
    code: '+993',
    country: 'Turkmenistan',
  },
  {
    label: 'TC',
    code: '+1',
    country: 'Turks and Caicos Islands',
  },
  {
    label: 'TV',
    code: '+688',
    country: 'Tuvalu',
  },
  {
    label: 'VI',
    code: '+1',
    country: 'U.S. Virgin Islands',
  },
  {
    label: 'UG',
    code: '+256',
    country: 'Uganda',
  },
  {
    label: 'UA',
    code: '+380',
    country: 'Ukraine',
  },
  {
    label: 'AE',
    code: '+971',
    country: 'United Arab Emirates',
  },
  {
    label: 'GB',
    code: '+44',
    country: 'United Kingdom',
  },
  {
    label: 'US',
    code: '+1',
    country: 'United States',
  },
  {
    label: 'UY',
    code: '+598',
    country: 'Uruguay',
  },
  {
    label: 'UZ',
    code: '+998',
    country: 'Uzbekistan',
  },
  {
    label: 'VU',
    code: '+678',
    country: 'Vanuatu',
  },
  {
    label: 'VE',
    code: '+58',
    country: 'Venezuela',
  },
  {
    label: 'VN',
    code: '+84',
    country: 'Vietnam',
  },
  {
    label: 'WF',
    code: '+681',
    country: 'Wallis and Futuna',
  },
  {
    label: 'YE',
    code: '+967',
    country: 'Yemen',
  },
  {
    label: 'ZM',
    code: '+260',
    country: 'Zambia',
  },
  {
    label: 'ZW',
    code: '+263',
    country: 'Zimbabwe',
  },
];
