import axios from 'axios';

export async function makeGitHubRequest(method: string, urlPath: string, data: any, githubPat: string) {
    try {
        const response = await axios({
            method,
            url: urlPath,
            data,
            headers: {
                'Authorization': `Bearer ${githubPat}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'VityToolKit-GitHub-Client'
            }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(`GitHub API Error: ${error.response?.data?.message || error.message}`);
    }
}
