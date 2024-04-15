export default function makeUrl(url, desc) {
  return (<a href={url} target="_blank" rel="noreferrer noopener">{desc}</a>);
}