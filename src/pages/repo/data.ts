import { AuthData, Repo } from "~/models";

const getAuthHeader = (
	token: string,
	provider: AuthData["provider"],
): string => {
	switch (provider) {
		case "github":
			return `token ${token}`;
		case "bitbucket":
		case "gitlab":
			return `Bearer ${token}`;
		default:
			return token;
	}
};

export const getRepos = async (authData: AuthData): Promise<Repo[]> => {
	const { token, user, provider } = authData;

	const urls = {
		github: `https://api.github.com/user/repos`,
		gitlab: `https://gitlab.com/api/v4/users/${user}/projects`,
		bitbucket: `https://api.bitbucket.org/2.0/repositories/${user}`,
	};

	const response = await fetch(urls[provider], {
		headers: {
			Authorization: getAuthHeader(token, provider),
		},
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	let data = await response.json();

	if (provider === "bitbucket") data = data.values;

	const mappers = {
		github: (r: any) => ({
			name: r.name,
			description: r.description,
			url: r.html_url,
		}),
		gitlab: (r: any) => ({
			name: r.path,
			description: r.description,
			url: r.web_url,
		}),
		bitbucket: (r: any) => ({
			name: r.name,
			description: r.description,
			url: r.links.html.href,
		}),
	};

	return [...data].map<Repo>(mappers[provider]);
};

export const createNew = async (
	name: string,
	isPrivate: boolean,
	authData: AuthData,
): Promise<void> => {
	const { token, user, provider } = authData;

	const gitlabParameters = `path=${name}&description=${`${user}'s Syncify Settings Repository`}&visibility=${
		isPrivate ? "private" : "public"
	}`;

	const urls = {
		github: `https://api.github.com/user/repos`,
		gitlab: `https://gitlab.com/api/v4/projects?${gitlabParameters}`,
		bitbucket: `https://api.bitbucket.org/2.0/repositories/${user}/${name}`,
	};

	const bodies = {
		github: {
			name,
			owner: user,
			description: `${user}'s Syncify Settings Repository`,
			private: isPrivate,
		},
		gitlab: {},
		bitbucket: {
			name,
			scm: "git",
			description: `${user}'s Syncify Settings Repository`,
			is_private: isPrivate,
		},
	};

	const response = await fetch(urls[provider], {
		method: "POST",
		body: JSON.stringify(bodies[provider]),
		headers: {
			"Content-Type": "application/json",
			Authorization: getAuthHeader(token, provider),
		},
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}
};
