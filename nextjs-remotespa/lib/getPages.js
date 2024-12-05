/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */

export async function getPages(rootPath) {
  const server = process.env.NEXT_PUBLIC_AEM_HOST;

  console.log(`### Fetch URL: ${server}${rootPath}.model.json`);
  const getRootPageModel = await (
    await fetch(`${server}${rootPath}.model.json`, {
      headers: {
        Authorization: 'Basic YWRtaW46YWRtaW4=',
      },
    })
  ).json();

  const pages = getRootPageModel[':children'];

  const filteredPages = [];
  for (const page in pages) {
    //const match = page.match(/^\/content\/wknd-app\/us\/en\/(\w+)$/i);
    //const match = page.match(/^\/content\/sb1\/nb\/(\w+)$/i);
    const match = page.match(/^\/content\/sites\/sb1\/nb\/smn\/(\w+)$/i);
    if (match) {
      filteredPages.push({ href: `/${match[1]}`, name: pages[page]['title'] });
    }
  }

  // add custom pages
  filteredPages.push({ name: 'Adventures', href: '/adventures' });

    console.log('### pages: ', filteredPages);
  return filteredPages;
}

export async function getSubPages(rootPath, pagePath) {
  pagePath = trimPagePath({ rootPath, pagePath });

  const server = process.env.NEXT_PUBLIC_AEM_HOST;
  const getRootPageModel = await (
      await fetch(`${server}${rootPath}.model.json`, {
        headers: {
          Authorization: 'Basic YWRtaW46YWRtaW4=',
        },
      })
  ).json();

    const subPages = getRootPageModel[':children'];
    const filteredPages = [];

    for (const subPage in subPages) {
        const regex = new RegExp(`^${pagePath}\\/([\\w-]+)$`, 'i');
        const match = subPage.match(regex);

    if (match) {
      // If subPage is e.g. /content/wknd-app/us/en/privat/daglig-bruk, the href we want to extract is /privat/daglig-bruk
        //const href = subPage.match(/\/([^/]+\/[^/]+)$/)[0];
             const href = subPage.match(/\/([^\/]+\/[^\/]+)$/)[0];
        console.log('### href: ', href);
      filteredPages.push({ href: href, name: subPages[subPage]['title'] });
    }
  }
    console.log('### subpages: ', filteredPages);
  return filteredPages;
}

function trimPagePath ({ rootPath, pagePath }) {
    const rootPathSegments = rootPath.split('/');
    const pagePathSegments = pagePath.split('/');

    // Check if pagePath is directly one level deeper than rootPath
    if (pagePathSegments.length === rootPathSegments.length + 1) {
        // pagePath is exactly one level deeper, return as is
        return pagePath;
    } else {
        // pagePath is more than one level deeper, trim it
        const trimmedPathSegments = pagePathSegments.slice(0, rootPathSegments.length + 1);
        return trimmedPathSegments.join('/');
    }
}

export default getPages;
