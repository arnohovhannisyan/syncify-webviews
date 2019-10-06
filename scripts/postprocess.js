const { resolve } = require("path");
const { readFile, writeFile } = require("fs-extra");

async function start() {
  const file = `${resolve(__dirname, "../dist")}/index.html`;
  const contents = await readFile(file, "utf-8");
  const newContents = contents
    .replace(/<script src="(.*?)"/, '<script src="@PWD/$1"')
    .replace(
      /<link rel="stylesheet" href="(.*?)"/,
      '<link rel="stylesheet" href="@PWD/$1"'
    );
  await writeFile(file, newContents);
}

start();
