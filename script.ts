interface CenterStat {
  value: string;
  label: string;
}

interface CenterData {
  name: string;
  fullName: string;
  tagline: string;
  location: string;
  feePerSubject: number;
  currency: string;
  capacity: number;
  levels: number[];
  subjects: string[];
  stats: CenterStat[];
  highlights: string[];
}

type ThemeMode = 'system' | 'light' | 'dark';
