// Get the audio URL for the top search result for a given word

const ytdl = require("ytdl-core");
const ytsr = require("ytsr");

async function ytSearch(query) {
  const filters = await ytsr.getFilters(query);
  const filter = filters.get("Type").find((o) => o.name === "Video");
  return await ytsr(null, {
    limit: 20,
    safeSearch: true,
    nextpageRef: filter.ref,
  });
}

async function getVidInfo(vid) {
  const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${vid}`);
  const formats = ytdl.filterFormats(info.formats, "audioonly");
  const prefered = formats.filter((f) => f.container.match(/mp4|m4a/))[0];
  return prefered || formats[0];
}

async function getResult(q) {
  const info = await ytSearch(q);
  const item = info.items[0];

  const vid = item.link.replace("https://www.youtube.com/watch?v=", "");

  const audioInfo = await getVidInfo(vid);
  if (!audioInfo) {
    console.log(`no audio matches for ${vid}`);
    return res.status(404).end();
  }
  console.log(item.title);
  console.log(audioInfo.url);
}

getResult(process.argv[2] || "rickroll");
