let _ = require("lodash");
let lodashContrib = require("lodash-contrib");

const blogStats = async (req, res) => {
  const url = "https://intent-kit-16.hasura.app/api/rest/blogs";
  const response = await fetch(
    url,
    { method: "GET" },
    {
      headers: {
        "x-hasura-admin-secret":
          "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
      },
    }
  );

  if (response.status != 200) {
    return res.json({ message: "unable to fetch data from api" });
  }

  const jsonResponse = await response.json();

  let blogsArr = [...jsonResponse.blogs];

  if (blogsArr.length < 0) {
    return res.json({ message: "No data found in Api" });
  }

  //calculating the total number of blogs fetched.
  let totalBlogFetch = _.size(blogsArr);

  let longestTitle = blogsArr[0].title;
  let numberOfBlogsTitleWithPrivacy = 0;
  let arrOfUniqueBlogTitle = [];

  //calculating the longest title and blogs with title privacy
  blogsArr.forEach((element) => {
    if (_.size(longestTitle) < _.size(element.title)) {
      longestTitle = element.title;
    }

    //checking NumberOfBlogsWithprivacyInTheTitle
    let check = lodashContrib.strContains(element.title, "privacy");
    if (check === true) {
      numberOfBlogsTitleWithPrivacy++;
    }
    arrOfUniqueBlogTitle.push(element.title);
  });

  //calculating unique blog title
  const result = _.uniq(arrOfUniqueBlogTitle);
  arrOfUniqueBlogTitle = [...result];

  res.json({
    TotalNumberOfBlogs: totalBlogFetch,
    TheTitleOfTheLongestBlog: longestTitle,
    NumberOfBlogsWithprivacyInTheTitle: numberOfBlogsTitleWithPrivacy,
    AnArrayOfUniqueBlogTitles: arrOfUniqueBlogTitle,
  });
};


//middleware of search query
const blogSearch = async (req, res) => {
  const url = "https://intent-kit-16.hasura.app/api/rest/blogs";
  const response = await fetch(url, {
    headers: {
      "x-hasura-admin-secret":
        "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
    },
  });

  if (response.status !== 200) {
    return res.json({ message: "unable to fetch data from api" });
  }

  const jsonResponse = await response.json();

  let blogsArr = [...jsonResponse.blogs];

  if (blogsArr.length < 0) {
    return res.json({ message: "No data found in Api" });
  }

  let searchResult = _.find(blogsArr, req.query);

  if (!searchResult) {
    return res.json({ message: "No result found" });
  }

  res.json({result: searchResult});
};

module.exports = { blogStats, blogSearch };
