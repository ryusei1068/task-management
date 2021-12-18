export default function cuttingStr(str) {
  const bytes = encodeURI(str).replace(/%../g, "*").length;
  return bytes >= 20 ? str.substr(0, 19) + "..." : str;
}
