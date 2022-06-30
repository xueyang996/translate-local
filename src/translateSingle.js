var invariant = require("tiny-invariant");
// import fetch from "node-fetch";
var fetch = require("node-fetch");
// import "zx/globals";
// import { event, info } from "./logger";
const path = require("path");
const fs = require("fs");
const args = require("minimist")(process.argv.slice(2));
var info = console.log;

console.log("%%%%%%%");
const cwd = process.cwd();
const API_URL = "http://localhost:8080/translate";
const cacheFile = path.join(__dirname, "translate.cache.json");
console.log(cacheFile, "#####");
const cacheData = fs.existsSync(cacheFile)
  ? JSON.parse(fs.readFileSync(cacheFile, "utf-8"))
  : {};
const cache = new Map(Object.entries(cacheData));

const saveCache = (key, value) => {
  cache.set(key, value);
  fs.writeFileSync(
    cacheFile,
    JSON.stringify(Object.fromEntries(cache), null, 2),
    "utf-8"
  );
};
console.log("!!!!!!!!!!");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const translate = async (opts) => {
  const { text, sourceLang = "auto", targetLang = "ZH" } = opts;
  invariant(text.length < 5000, `Too long... ${text.length}`);
  if (cache.has(text)) {
    info(`Cache hit.`);
    return cache.get(text);
  }
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      text,
      source_lang: sourceLang,
      target_lang: targetLang,
    }),
  });
  invariant(res.status === 200, `${res.status} ${res.statusText}`);
  const json = await res.json();
  const { data } = json;
  invariant(data, `data is null, ${JSON.stringify(json)}`);
  saveCache(text, data);
  return data;
};

(async () => {
  console.log("???????");
  info(args);
  const file = args.file;
  const absFile = path.isAbsolute(file) ? file : path.join(cwd, file);
  const SEPARATOR = "\n\n";
  const CHAR_COUNT_LIMIT = 4000;
  const lineMap = new Map();

  invariant(fs.existsSync(absFile), `File not found: ${absFile}`);
  const text = fs.readFileSync(absFile, "utf-8").trim();
  info(`text length: ${text.length}`);
  invariant(text.length <= 4000, `Too long...`);

  // translate
  const translatedText = await translate({
    text,
    sourceLang: args.sourceLang,
    targetLang: args.targetLang,
  });
  console.log(translatedText, "#####");
  // merge
  const textArr = text.split("\n\n");
  const translatedTextArr = translatedText.split("\n\n");
  const mergedArr = textArr.map((text, i) => {
    // don't translate code block
    if (text.startsWith("```")) {
      return text;
    } else {
      return `${text}\n\n${translatedTextArr[i]}`;
    }
  });

  // read file
  // invariant(fs.existsSync(absFile), `File not found: ${absFile}`);
  // const text = fs.readFileSync(absFile, "utf-8").trim();
  // info(`text length: ${text.length}`);
  // const lines = text.split(SEPARATOR);
  // console.log(text, lines);

  // // split lines to blocks
  // const blocks = [];
  // let currBlock = [];
  // let currCharCount = 0;
  // for (const line of lines) {
  //   let type;
  //   if (line.startsWith("```")) {
  //     type = "CODE_BLOCK";
  //   } else if (/^!\[(.+)?]\(.+?\)$/.test(line)) {
  //     type = "IMG";
  //   }
  //   lineMap.set(line, { type });
  //   if (type !== "TEXT") continue;
  //   const charCount = line.length;
  //   if (currCharCount + charCount > CHAR_COUNT_LIMIT) {
  //     blocks.push(currBlock);
  //     currBlock = [];
  //     lineMap;
  //     currBlock.push(line);
  //     currCharCount = charCount;
  //   } else {
  //     currBlock.push(line);
  //     currCharCount += charCount;
  //   }
  // }
  // if (currBlock.length > 0) {
  //   blocks.push(currBlock);
  // }
  // info(`block length: ${blocks.length}`);

  // // translate
  // const blockLength = blocks.length;
  // for (const [index, block] of blocks.entries()) {
  //   const text = block.join(SEPARATOR);
  //   info(`[${index + 1}/${blockLength}] Translating block...`);
  //   const { data: translatedText, cache } = await translate({
  //     text,
  //     sourceLang: args.sourceLang,
  //     targetLang: args.targetLang,
  //   });
  //   console.log("#####", translatedText, cache);
  //   const translatedTextArr = translatedText.split(SEPARATOR);
  //   invariant(
  //     block.length === translatedTextArr.length,
  //     `translated length not match`
  //   );
  //   for (let i = 0; i < block.length; i++) {
  //     const line = block[i];
  //     const translatedLine = translatedTextArr[i];
  //     invariant(lineMap.has(line), `line not found in map: ${line}`);
  //     lineMap.get(line).text = translatedLine;
  //   }
  //   if (!cache && index < blockLength - 1) {
  //     const delayTime = 1000 + Math.floor(Math.random() * 2000);
  //     info(`delay ${delayTime}ms...`);
  //     await delay(delayTime);
  //   }
  // }

  // // merge
  // const mergedArr = [];
  // for (const [line, { type, text }] of lineMap.entries()) {
  //   if (type === "TEXT") {
  //     mergedArr.push(line);
  //     mergedArr.push(text);
  //   } else {
  //     mergedArr.push(line);
  //   }
  // }
  // info(`Merged.`, mergedArr);

  // write new file
  const absNewFile = absFile.replace(/\.md/, ".translated.md");
  fs.writeFileSync(absNewFile, mergedArr.join(SEPARATOR), "utf-8");
  // event(`Translated to ${absNewFile}`);
  console.log("???????$$$$$$$$$");
})();

console.log("222222!!!!!!!!!!");
