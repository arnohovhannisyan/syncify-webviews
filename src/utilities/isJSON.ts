export const isJSON = (json: string): boolean => {
	try {
		JSON.parse(json);
		return true;
	} catch {
		return false;
	}
};
