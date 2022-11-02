import * as fs from "fs";
import colours from "./colours";
import sh from "./file_tool";
import tl from "./tool";

const main = () => {
  try {
    fs.readFileSync("./.next/required-server-files.json");
  } catch {
    console.error(`${colours.fg.red}Not in Nextjs Root Folder${colours.reset}`);
    return;
  }
  const config: any = JSON.parse(
    fs.readFileSync("./.next/required-server-files.json").toString()
  ).config;
  const ARGV = process.argv.slice(2);
  const ID = fs.readFileSync("./.next/BUILD_ID").toString();
  const TRAIL = ARGV.indexOf("trail") !== -1 || config.trailingSlash;
  const DFLT = (config.i18n && config.i18n.defaultLocale) || "";
  // ^ Default Locale -> only for apps using i18n
  if (sh.isFolder("out")) sh.delete("out");
  sh.makedir("out");
  // Copying Static Assets
  sh.copy(".next/static", "out/_next/static");
  const ignore_in_public = (() => {
    let ignr: string[] = [];
    try {
      ignr = tl
        .replace_all(
          fs.readFileSync("public/.export_ignores").toString(),
          "\r\n",
          "\n"
        )
        .split("\n");
      ignr.push(".export_ignores");
      console.log(
        `${colours.fg.green}info - ${colours.reset}.export_ignores has been loaded`
      );
    } catch {}
    return ignr;
  })() as string[];
  sh.makedir(`out/_next/${ID}`);
  // Copying HTML files and JSON
  const to_path = (fl: string) => {
    const nm = tl.last(fl.split("/"));
    if (!TRAIL || tl.in(nm, ["404.html", "index.html"])) return fl;
    else if (TRAIL) return `${fl.split(".")[0]}/index.html`;
  };
  const copy_HTML_JSON = (
    loc = `.next/server/pages`,
    out = `out`,
    base = ``
  ) => {
    // copying html and json in nested folders
    const list = sh.listdir(loc);
    for (let x of list) {
      const lc = `${loc}/${x}`;
      const to = `${out}/${x}`;
      const ext = x.split(".")[1];
      if (DFLT !== "" && base === `/${DFLT}` && x === "404.html")
        sh.copy(lc, "out/404.html");
      // ^ ensuring that 404 is not present in every locale folder
      if (tl.in(x, ["500.html", "404.html"])) continue;
      if (sh.isFile(lc)) {
        if (ext === "html") {
          if (DFLT !== "" && x === `${DFLT}.html`)
            sh.copy(lc, "out/index.html");
          sh.copy(lc, to_path(to)!);
          if (DFLT !== "" && base.startsWith(`/${DFLT}`))
            sh.copy(
              lc,
              to_path(`out/${(base + "/").substring(DFLT.length + 2) + x}`)!
            );
        } else if (ext === "json")
          sh.copy(lc, `out/_next/data/${ID}/${base}/${x}`);
      } else if (sh.isFolder(lc)) copy_HTML_JSON(lc, to, `${base}/${x}`);
    }
  };
  copy_HTML_JSON();
  for (let x of sh.listdir("public")) {
    if (tl.in(x, ignore_in_public)) continue;
    sh.copy(`public/${x}`, `out/${x}`);
  }
  console.log(
    `${colours.fg.green}Copied Static Assets to /out${colours.reset}`
  );
};

export default main;
