import * as fse from "fs-extra";
import * as fs from "fs";
class सञ्चितोपकरणम् {
  delete(lc: string) {
    fs.rmSync(lc, {
      recursive: true,
      force: true,
    });
  }
  copy(srcDir: string, destDir: string) {
    fse.copySync(srcDir, destDir);
  }
  makedir(lc: string) {
    if (!fs.existsSync(lc)) fs.mkdirSync(lc);
  }
  listdir(lc: string) {
    return fs.readdirSync(lc);
  }
  isFile = (fileName: string) => {
    return fs.existsSync(fileName) && fs.lstatSync(fileName).isFile();
  };
  isFolder = (fileName: string) => {
    return fs.existsSync(fileName) && fs.lstatSync(fileName).isDirectory();
  };
}
const sh = new सञ्चितोपकरणम्();
export default sh;
