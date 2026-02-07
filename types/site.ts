export interface ISiteConfig {
  metadata: {
    title: string;
    subTitle?: string;
    description?: string;
    keywords?: string[];
    author?: string;
    author_url?: string;
    publisher?: string;
    publisher_url?: string;
    language?: string;
  };
  github?: {
    username: string;
    repo: string;
  };
}
