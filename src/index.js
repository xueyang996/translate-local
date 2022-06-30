var TurndownService = require("turndown");
var pb = require("pb");
const path = require("path");
const fs = require("fs");
const args = require("minimist")(process.argv.slice(2));
const translate = require("./translate.js");

module.exports = async () => {
  const html = pb.get("html");

  const markdown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    // fence: '```````',
  }).turndown(html);
  // info(`markdown: ${markdown}`);

  // trim line
  const trimedMarkdown = markdown
    .split("\n")
    .map((line) => line.trim())
    .join("\n");

  const file = args.file || "test";
  const port = args.file || 8080;
  const mdFile = path.join(__dirname, `../docs/${file}.md`);
  const folder = path.join(__dirname, `../docs`);
  const flag = fs.existsSync(folder);
  if (!flag) {
    fs.mkdirSync(folder);
  }
  fs.writeFileSync(mdFile, trimedMarkdown, "utf-8");

  translate(mdFile, port);
};
