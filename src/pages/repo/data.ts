import { IAuthData, IRepo } from "~/models";

const getAuthHeader = (token: string, provider: IAuthData["provider"]) =>
  ({
    github: `token ${token}`,
    gitlab: `Bearer ${token}`,
    bitbucket: `Bearer ${token}`
  }[provider]);

export class Data {
  public static async getRepos(authData: IAuthData): Promise<IRepo[]> {
    const { token, user, provider } = authData;

    const urls = {
      github: `https://api.github.com/user/repos`,
      gitlab: `https://gitlab.com/api/v4/users/${user}/projects`,
      bitbucket: `https://api.bitbucket.org/2.0/repositories/${user}`
    };

    let data = await fetch(urls[provider], {
      headers: {
        Authorization: getAuthHeader(token, provider)
      }
    }).then(res => res.json());

    if (provider === "bitbucket") data = data.values;

    const mappers = {
      github: (r: any) => ({
        name: r.name,
        description: r.description,
        url: r.html_url
      }),
      gitlab: (r: any) => ({
        name: r.path,
        description: r.description,
        url: r.web_url
      }),
      bitbucket: (r: any) => ({
        name: r.name,
        description: r.description,
        url: r.links.html.href
      })
    };

    return [...data].map<IRepo>(mappers[provider]);
  }

  public static async createNew(
    name: string,
    isPrivate: boolean,
    authData: IAuthData
  ) {
    const { token, user, provider } = authData;

    const gitlabParams = `path=${name}&description=${`${user}'s Syncify Settings Repository`}&visibility=${
      isPrivate ? "private" : "public"
    }`;

    const urls = {
      github: `https://api.github.com/user/repos`,
      gitlab: `https://gitlab.com/api/v4/projects?${gitlabParams}`,
      bitbucket: `https://api.bitbucket.org/2.0/repositories/${user}/${name}`
    };

    const bodies = {
      github: {
        name,
        owner: user,
        description: `${user}'s Syncify Settings Repository`,
        private: isPrivate
      },
      gitlab: {},
      bitbucket: {
        name,
        scm: "git",
        description: `${user}'s Syncify Settings Repository`,
        is_private: isPrivate
      }
    };

    return fetch(urls[provider], {
      method: "POST",
      body: JSON.stringify(bodies[provider]),
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(token, provider)
      }
    });
  }
}
