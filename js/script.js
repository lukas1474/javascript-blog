'use strict';

{
  /*document.getElementById('test-button').addEventListener('click', function(){
      const links = document.querySelectorAll('.titles a');
      console.log('links:', links);
    });*/

  const titleClickHandler = function (event) {
    //console.log('Link was clicked!', event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    event.preventDefault();

    const clickedElement = this;
    clickedElement.classList.add('active');
    //console.log('clickedElement (with plus): ' + clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('article');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    //console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    //console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  function generateTitleLinks(customSelector = '') {
    console.log(generateTitleLinks);

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

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

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

  function generateTags() {
    console.log(generateTitleLinks);

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      console.log(article);
    }

    /* START LOOP: for every article: */

    for (let article of articles) {
      console.log(article);

      /* find tags wrapper */

      const tagsList = article.querySelector(optArticleTagsSelector);
      console.log(tagsList);

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* START LOOP: for each tag */

      for (let tag of articleTagsArray) {
        console.log(tag);
        /* generate HTML of the link */

        const linkHTML = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';
        console.log(linkHTML);

        /* add generated code to html variable */
        html = html + linkHTML;

        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */

      /* END LOOP: for every article: */
    }

  }



  generateTags();

  function tagClickHandler(event) {
    console.log(tagClickHandler);

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

      console.log(activeLink);

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

  addClickListenersToTags();

  function addClickListenersToTags() {

    /* find all links to tags */

    const links = document.querySelectorAll('.post-tags a');

    /* START LOOP: for each link */
    for (let link of links) {

      /* add tagClickHandler as event listener for that link */

      link.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
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

    addClickListenersToAuthors();
  }

  function addClickListenersToAuthors() {

    /* find all links to author */

    const links = document.querySelectorAll('data-author=" "');

    /* START LOOP: for each link */
    for (let link of links) {

      /* add tagClickHandler as event listener for that link */

      link.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }
  }
}









/* find author wrapper */
   // const authorList = article.querySelector(optArticleAuthorSelector);
    //console.log(authorList);

    //let html = '';
/* get tags from data-tags attribute */

    //const articleAuthors = article.getAttribute('data-author');
    //console.log(articleAuthors);
