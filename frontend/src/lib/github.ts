// githubLinks.ts

/**
 * Represents the structure of a GitHub repository
 */
interface GitHubRepo {
  owner: string;
  name: string;
}

/**
 * Available GitHub issue templates
 */
export enum IssueTemplate {
  BUG = 'bug_report.yml',
  FEATURE = 'feature_request.yml',
  DATA = 'data_issue.yml'
}

/**
 * Available GitHub discussion categories
 */
export enum DiscussionCategory {
  ANNOUNCEMENTS = 'announcements',
  IDEAS = 'ideas',
  GENERAL = 'general',
  QA = 'q-a',
  SHOW_AND_TELL = 'show-and-tell'
}

/**
 * Options for creating a new issue
 */
interface NewIssueOptions {
  template: IssueTemplate;
  title?: string;
  labels?: string[];
  assignees?: string[];
  projects?: string[];
  milestone?: string;
}

/**
 * Parse a GitHub repository string in the format "owner/name"
 * @param repoString Repository string in format "owner/name"
 * @throws Error if the format is invalid
 */
function parseRepoString(repoString: string): GitHubRepo {
  const parts = repoString.split('/');
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new Error('Invalid repository format. Expected "owner/name"');
  }
  return {
    owner: parts[0],
    name: parts[1]
  };
}

/**
 * GitHub link generator class
 */
export class GitHubLinks {
  private baseUrl: string;
  private repo: GitHubRepo;

  /**
   * Create a new GitHubLinks instance
   * @param repo Repository information as either an object or "owner/name" string
   */
  constructor(repo: GitHubRepo | string) {
    this.repo = typeof repo === 'string' ? parseRepoString(repo) : repo;
    this.baseUrl = `https://github.com/${this.repo.owner}/${this.repo.name}`;
  }

  /**
   * Create a GitHubLinks instance from an environment variable
   * @param envVar Environment variable name containing the repo string
   * @throws Error if environment variable is not set or invalid
   */
  static fromEnv(envVar: string): GitHubLinks {
    const repoString = process.env[envVar];
    if (!repoString) {
      throw new Error(`Environment variable ${envVar} is not set`);
    }
    return new GitHubLinks(repoString);
  }

  /**
   * Get repository information
   */
  getRepo(): GitHubRepo {
    return { ...this.repo };
  }

  /**
   * Get the base repository URL
   */
  getRepoUrl(): string {
    return this.baseUrl;
  }

  /**
   * Get URL to the repository's discussions page
   * @param category Optional discussion category to link to
   */
  getDiscussionsUrl(category?: DiscussionCategory): string {
    const baseDiscussionUrl = `${this.baseUrl}/discussions`;
    return category ? `${baseDiscussionUrl}/categories/${category}` : baseDiscussionUrl;
  }

  /**
   * Get URL to create a new issue with specified template
   * @param options Options for creating the issue
   */
  getNewIssueUrl(options: NewIssueOptions): string {
    const params = new URLSearchParams();

    // Add template parameter
    params.append('template', options.template);

    // Add optional parameters if provided
    if (options.title) {
      params.append('title', options.title);
    }
    if (options.labels?.length) {
      params.append('labels', options.labels.join(','));
    }
    if (options.assignees?.length) {
      params.append('assignees', options.assignees.join(','));
    }
    if (options.projects?.length) {
      params.append('projects', options.projects.join(','));
    }
    if (options.milestone) {
      params.append('milestone', options.milestone);
    }

    return `${this.baseUrl}/issues/new?${params.toString()}`;
  }

  /**
   * Get URL to the issues page
   * @param label Optional label to filter issues
   */
  getIssuesUrl(label?: string): string {
    const baseIssuesUrl = `${this.baseUrl}/issues`;
    return label ? `${baseIssuesUrl}?q=label%3A${encodeURIComponent(label)}` : baseIssuesUrl;
  }

  /**
   * Get URL to a specific file in the repository
   * @param path Path to the file from repository root
   * @param branch Branch name (defaults to 'main')
   */
  getFileUrl(path: string, branch: string = 'main'): string {
    return `${this.baseUrl}/blob/${branch}/${path}`;
  }
}


export const missingEntryOptions =  (uniprotAcc?: string) => ({
    template: IssueTemplate.DATA,
    title: `[DATA] missing structure for ${uniprotAcc}`,
    labels: ['missing-entry', 'data'],
  });

export const missingStructureOptions =  (uniprotAcc?: string) => ({
    template: IssueTemplate.DATA,
    title: `[DATA] missing structure for ${uniprotAcc}`,
    labels: ['missing-structure', 'data'],
  });
