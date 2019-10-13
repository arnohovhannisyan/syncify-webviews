import axios from "axios";
import dashify from "dashify";
import { IAuthData, IRepo } from "~/pages/repo";

const getAuthHeaders = (token: string) => ({
  github: `token ${token}`,
  gitlab: `Bearer ${token}`,
  bitbucket: `Bearer ${token}`
});

export class Data {
  public static async getRepos(authData: IAuthData): Promise<IRepo[]> {
    const { token, user, provider } = authData;

    const urls = {
      github: `https://api.github.com/user/repos`,
      gitlab: `https://gitlab.com/api/v4/users/${user}/projects`,
      bitbucket: `https://api.bitbucket.org/2.0/repositories/${user}`
    };

    let { data } = await axios.get(urls[provider], {
      headers: {
        Authorization: getAuthHeaders(token)[provider]
      }
    });

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
        url: r.html_url
      })
    };

    return [...data].map<IRepo>(mappers[provider]);
  }

  public static async createNew(
    name: string,
    isPrivate: boolean,
    authData: IAuthData
  ) {
    const newName = dashify(name);

    const { token, user, provider } = authData;

    const gitlabParams = `path=${newName}&description=${`${user}'s Syncify Settings Repository`}&visibility=${
      isPrivate ? "private" : "public"
    }`;

    const urls = {
      github: `https://api.github.com/user/repos`,
      gitlab: `https://gitlab.com/api/v4/projects?${gitlabParams}`,
      bitbucket: `https://api.bitbucket.org/2.0/repositories/${user}/${newName}`
    };

    const bodies = {
      github: {
        newName,
        owner: user,
        description: `${user}'s Syncify Settings Repository`,
        private: isPrivate
      },
      gitlab: {},
      bitbucket: {
        scm: "git",
        name: newName,
        description: `${user}'s Syncify Settings Repository`,
        is_private: isPrivate
      }
    };

    if (provider === "github") {
      return axios.post(urls[provider], {
        data: bodies[provider],
        headers: {
          Authorization: getAuthHeaders(token)[provider]
        }
      });
    }

    return fetch(urls[provider], {
      method: "POST",
      body: JSON.stringify(bodies[provider]),
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeaders(token)[provider]
      }
    });
  }
}
