var TurndownService = require("turndown");
var pb = require("pb");
const path = require("path");
const fs = require("fs");
const args = require("minimist")(process.argv.slice(2));

const html = pb.get("html");
console.log(html, "######");
// info(`html: ${html}`);

//   const html = `
// <meta charset='utf-8'><h2 dir="auto" style="box-sizing: border-box; margin-top: 24px; margin-bottom: 16px; font-size: 1.5em; font-weight: 600; line-height: 1.25; padding-bottom: 0.3em; border-bottom: 1px solid var(--color-border-muted); color: rgb(36, 41, 47); font-family: -apple-system, &quot;system-ui&quot;, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Install</h2><div class="highlight highlight-source-shell notranslate position-relative overflow-auto" style="box-sizing: border-box; position: relative !important; overflow: auto !important; margin-bottom: 16px; color: rgb(36, 41, 47); font-family: -apple-system, &quot;system-ui&quot;, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><pre style="box-sizing: border-box; font-family: ui-monospace, SFMono-Regular, &quot;SF Mono&quot;, Menlo, Consolas, &quot;Liberation Mono&quot;, monospace; font-size: 13.6px; margin-top: 0px; margin-bottom: 0px; overflow-wrap: normal; padding: 16px; overflow: auto; line-height: 1.45; background-color: var(--color-canvas-subtle); border-radius: 6px; word-break: normal;">npm install clipboardy</pre></div><h2 dir="auto" style="box-sizing: border-box; margin-top: 24px; margin-bottom: 16px; font-size: 1.5em; font-weight: 600; line-height: 1.25; padding-bottom: 0.3em; border-bottom: 1px solid var(--color-border-muted); color: rgb(36, 41, 47); font-family: -apple-system, &quot;system-ui&quot;, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><a id="user-content-usage" class="anchor" aria-hidden="true" href="https://github.com/sindresorhus/clipboardy#usage" style="box-sizing: border-box; background-color: transparent; color: var(--color-accent-fg); text-decoration: none; transition: color 80ms cubic-bezier(0.33, 1, 0.68, 1) 0s, background-color, box-shadow, border-color; float: left; padding-right: 4px; margin-left: -20px; line-height: 1;"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a></h2><br class="Apple-interchange-newline">
//   `;

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

const file = args.file;
const mdFile = path.join(__dirname, `../docs/${file}.md`);
fs.writeFileSync(mdFile, trimedMarkdown, "utf-8");
