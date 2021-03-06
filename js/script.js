'use strict';

{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
  };


  const titleClickHandler = function (event) {

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    event.preventDefault();

    const clickedElement = this;
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('article');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorsSelector = '.post-author',
    optTitleSelector = '.post-title',
    //optTagsListSelector = '.tags.list',
    //optAuthorsListSelector = '.authors.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optTitleListSelector = '.titles';


  function generateTitleLinks(customSelector = '') {

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    for (let article of articles) {
      console.log(article);
    }

    let html = '';

    for (let article of articles) {
      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');
      console.log(articleId);

      /* [DONE] find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);

      /* [DONE] create HTML of the link */

      //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      //console.log(linkHTML);
      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);

      /* [DONE] insert link into titleList */

      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();




  function calculateTagsParams(tags) {
    const params = { min: 999999, max: 0 };

    for (let tag in tags) {
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }

    return params;
  }

  calculateTagsParams();



  // calculateTagClass();

  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;

  }





  function generateTags() {
    //console.log(generateTitleLinks);

    /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};
    console.log(allTags);

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      console.log(article);
    }

    /* START LOOP: for every article: */

    for (let article of articles) {

      /* find tags wrapper */

      const tagsList = article.querySelector(optArticleTagsSelector);

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */

      for (let tag of articleTagsArray) {
        console.log(tag);
        /* generate HTML of the link */

        //const linkHTML = '<li><a href="#' + tagsList + '"><span>' + tag + '</span></a></li>';
        const linkHTMLData = {id: tagsList, title: tag};
        const linkHTML = templates.tagLink(linkHTMLData);

        /* add generated code to html variable */
        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */

        if (!allTags[tag]) {

          /* [NEW] add generated code to allTags array */

          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */

      /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */

    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    /* [NEW] create variable for all links HTML code */
    //let allTagsHTML = '';
    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */

      //'<a href="">' + tag + ' (' + allTags[tag] + ')</a>';
      //const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"><span>' + tag + ' (' + allTags[tag] + ') ' + '</span></a></li>';
      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log('tagLinkHTML:', tagLinkHTML);

      //allTagsHTML += tagLinkHTML;
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    //tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);




  }

  generateTags();


  function tagClickHandler(event) {

    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */

    const activeLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each active tag link */

    for (let activeLink of activeLinks) {

      /* remove class active */

      activeLink.classList.remove('active');

      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */

    const tagLinks = document.querySelectorAll('a[href = "' + href + '"]');

    /* START LOOP: for each found tag link */

    for (let tagLink of tagLinks) {

      /* add class active */

      tagLink.classList.add('active');

      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');

  }

  function addClickListenersToTags() {

    /* find all links to tags */

    const links = document.querySelectorAll('.post-tags a, .list.tags a');

    /* START LOOP: for each link */
    for (let link of links) {

      /* add tagClickHandler as event listener for that link */

      link.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();





  function calculateAuthorsParams(authors) {
    const params = { min: 999999, max: 0 };

    for (let author in authors) {
      console.log(author + ' is used ' + authors[author] + ' times');
      if (authors[author] > params.max) {
        params.max = authors[author];
      }
      if (authors[author] < params.min) {
        params.min = authors[author];
      }
    }
    return params;
  }

  calculateAuthorsParams();

  // calculateAuthorClass();

  function calculateAuthorClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;

  }



  function generateAuthors() {
    console.log(generateAuthors);

    /* [NEW] create a new variable allAuthors with an empty array */
    let allAuthors = {};
    console.log(allAuthors);

    /* find all authors */

    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      console.log(article);
    }

    /* START LOOP: for every article: */

    for (let article of articles) {

      /* find authors wrapper */

      const authorsList = article.querySelector(optArticleAuthorsSelector);

      let html = '';

      /* get authors from data-tags attribute */

      const articleAuthors = article.getAttribute('data-author');

      /* split authors into array */

      //const articleAuthorArray = articleAuthor();

      /* add generated code to html variable */
      //const linkHTML = '<li><a href="#author-' + authorsList + '"><span>' + articleAuthors + '</span></a></li>';
      const linkHTMLData = {id: authorsList, title: articleAuthors};
      const linkHTML = templates.authorLink(linkHTMLData);


      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allAuthors */

      if (!allAuthors[articleAuthors]) {
        /* [NEW] add generated code to allAuthors array */
        allAuthors[articleAuthors] = 1;
      } else {
        allAuthors[articleAuthors]++;
      }
    }

    /* [NEW] find list of authors in right column */

    const authorList = document.querySelector('.authors');

    const authorsParams = calculateAuthorsParams(allAuthors);
    console.log('authorsParams:', authorsParams);

    /* [NEW] create variable for all links HTML code */
    //let allAuthorsHTML = '';
    const allAuthorsData = {articleAuthors: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let articleAuthors in allAuthors) {
      /* [NEW] generate code of a link and add it to allTagsHTML */

      //'<a href="">' + tag + ' (' + allTags[tag] + ')</a>';
      //const authorLinkHTML = '<li><a class="' + calculateAuthorClass(allAuthors[articleAuthors], authorsParams) + '" href="#author-' + articleAuthors + '"><span>' + articleAuthors + ' (' + allAuthors[articleAuthors] + ') ' + '</span></a></li>';
      const authorLinkHTML = '<li><a class="' + calculateAuthorClass(allAuthors[articleAuthors], authorsParams) + '" href="#author-' + articleAuthors + '"><span>' + articleAuthors + '</span></a></li>';
      console.log('authorLinkHTML:', authorLinkHTML);

      //allAuthorsHTML += authorLinkHTML;
      allAuthorsData.articleAuthors.push({
        articleAuthors: articleAuthors,
        count: allAuthors[articleAuthors],
        className: calculateAuthorClass(allAuthors[articleAuthors], authorsParams)
      });
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    //authorList.innerHTML = allAuthorsHTML;
    authorList.innerHTML = templates.authorCloudLink(allAuthorsData);

  }

  generateAuthors();



  function authorClickHandler(event) {
    console.log(authorClickHandler);

    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;
    console.log('author was cliked');

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract tag from the "href" constant */

    const author = href.replace('#author-', '');

    /* find all author links with class active */

    const activeLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each active author link */

    for (let activeLink of activeLinks) {
      console.log(activeLink);

      /* remove class active */

      activeLink.classList.remove('active');

      /* END LOOP: for each active author link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */

    const authorLinks = document.querySelectorAll('a[href = "' + href + '"]');

    /* START LOOP: for each found author link */

    for (let authorLink of authorLinks) {

      /* add class active */

      authorLink.classList.add('active');

      /* END LOOP: for each found author link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-author="' + author + '"]');


  }


  function addClickListenersToAuthors() {

    /* find all links to author */

    const links = document.querySelectorAll('.post-author a, .authors.list a');

    /* START LOOP: for each link */
    for (let link of links) {

      /* add tagClickHandler as event listener for that link */

      link.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }
  }

  addClickListenersToAuthors();


}
