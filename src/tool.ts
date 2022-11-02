class उपकरणम् {
  removeItem(array: any[], el: any) {
    const index = array.indexOf(el);
    if (index != -1) array.splice(index, 1);
    return array;
  }
  replace_all(str: string, replaceWhat: string, replaceTo: string) {
    replaceWhat = replaceWhat.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    var re = new RegExp(replaceWhat, "g");
    return str.replace(re, replaceTo);
  }
  last(s: any, l = -1) {
    if (!s) return "";
    let r = s[s.length + l];
    return r;
  }
  in(val: any, in_what: any) {
    return in_what.indexOf(val) != -1;
  }
  time() {
    return new Date().getTime() / 1000;
  }
  dict_rev(d: any) {
    let res: any = {};
    for (let x in d) {
      res[d[x]] = x;
    }
    return res;
  }
  substring(val: string, from: number, to: number = null!) {
    if (to == null) to = val.length;
    if (to > 0) return val.substring(from, to);
    else if (to < 0) return val.substring(from, val.length + to);
  }
  format(val: string, l: string[]) {
    for (let x = 0; x < l.length; x++)
      val = this.replace_all(val, `{${x}}`, l[x]);
    return val;
  }
}
const tl = new उपकरणम्();
export default tl;
