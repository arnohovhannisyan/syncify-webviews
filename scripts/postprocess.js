const glob = require("fast-glob");
const { resolve } = require("path");
const { readFile, writeFile } = require("fs-extra");

async function start() {
  const files = await glob(`${resolve(__dirname, "../dist")}/**/*.html`);

  await Promise.all(
    files.map(async file => {
      const contents = await readFile(file, "utf-8");
      const newContents = contents
        .replace(/<script src="(.*?)"/, '<script src="@PWD/$1"')
        .replace(
          /<link rel="stylesheet" href="(.*?)"/,
          '<link rel="stylesheet" href="@PWD/$1"'
        );
      await writeFile(file, newContents);
    })
  );
}

start();
