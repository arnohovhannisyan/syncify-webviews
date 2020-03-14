const { resolve } = require("path");
const { readFile, writeFile } = require("fs").promises;

async function start() {
	const file = `${resolve(__dirname, "../dist")}/index.html`;
	const contents = await readFile(file, "utf-8");

	await writeFile(
		file,
		contents.replace(
			/<(link|script)(\srel="stylesheet")? ?(src|href)="(.*?)"/g,
			'<$1$2 $3="@PWD/$4"'
		)
	);
}

start();
