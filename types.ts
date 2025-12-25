
export interface WorkItem {
  year?: string;
  title: string;
  category?: string;
  description?: string;
  tag?: string;
  link?: string;
}

export interface MerchCategory {
  type: string;
  items: string[];
}

export interface EventProject {
  year: string;
  category: string;
  title: string;
  link?: string;
  image?: string;
}

export interface Sponsorship {
  year: string;
  title: string;
  award: string;
  note?: string;
  image?: string;
}

export interface ResumeData {
  name: string;
  nickname: string;
  books: WorkItem[];
  merch: MerchCategory[];
  digital: WorkItem[];
  events: EventProject[];
  sponsorships: Sponsorship[];
  extras: {
    stats: string[];
    bio: string;
  };
}
