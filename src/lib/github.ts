export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
}

export async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(`https://api.github.com/users/${username}/repos`)

  if (!response.ok) {
    throw new Error(
      `Failed to fetch repos for "${username}": ${response.status} ${response.statusText}`,
    )
  }

  const repos: GitHubRepo[] = await response.json()

  return repos.filter((repo) => repo.stargazers_count > 0 && repo.name !== 'Portfolio')
}
