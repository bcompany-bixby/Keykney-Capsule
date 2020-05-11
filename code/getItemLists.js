var http = require('http')
var console = require('console')

module.exports.function = function getItemLists() {
  let url = "https://www.instagram.com/keykney/?__a=1"; // keykney Timeline

  let first = [];
  let results = [];
  if (url != "undefined") {
    let response = http.getUrl(url, {
      format: "json",
      cacheTime: 0,
    });
    // console.debug('response', response);

    first.push({
      creator: response.graphql.user.full_name,
      title: response.graphql.user.biography,
      thumbnail: response.graphql.user.profile_pic_url_hd,
      uri: "https://www.instagram.com/keykney/"
    });
    // console.log("first", first);

    let items = [].concat(response.graphql.user.edge_owner_to_timeline_media.edges);
    results = items.map((item, index) => {
      return {
        itemlink: "https://www.instagram.com/p/" + item.node.shortcode,
        liked: item.node.edge_liked_by.count,
        title: item.node.edge_media_to_caption.edges[0].node.text,
        description: item.node.edge_media_to_caption.edges[0].node.text,
        thumbnail: item.node.thumbnail_src
      }
    });
    results = first.concat(results);
    // console.debug('results', results);
  }

  return results;
}
