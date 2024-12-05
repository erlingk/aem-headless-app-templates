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

import Head from 'next/head';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import SB1Header from "./layoutSB1Header";

const { NEXT_PUBLIC_URL } = process.env;

export const siteTitle = 'WKND';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Layout({ children, pages, subPages }) {
  const router = useRouter();
  const isCurrentPage = (currPath) => {
    const path = router.asPath === '/' ? '/home' : router.asPath;
    return path === currPath;
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="AEM WKND built in Next.js" />
        <meta
          property="og:image"
          content={`${NEXT_PUBLIC_URL}/wknd-logo-dk.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="cq:pagemodel_router" content="disabled" />
      </Head>
      <Disclosure as="nav" className="bg-gray-100">
        {({ open }) => (
          <>
              <SB1Header pages={pages} subPages={subPages} isCurrentPage={isCurrentPage} open={open}/>

              <Disclosure.Panel className="sm:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                      {pages.map((item) => (
                          <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className={classNames(
                                  isCurrentPage(item.href)
                                      ? 'bg-yellow-300 text-gray-700'
                                      : 'text-gray-800 hover:bg-yellow-200 hover:text-gray-700',
                                  'block px-3 py-2 rounded-md text-base font-medium'
                              )}
                              aria-current={
                                  isCurrentPage(item.href) ? 'page' : undefined
                              }>
                              {item.name}
                          </Disclosure.Button>
                      ))}
                  </div>
              </Disclosure.Panel>
          </>
        )}
      </Disclosure>
        <main className="flex-grow">{children}</main>
        <footer className="text-center bg-gray-200 lg:text-left">
            <div className="p-4 text-center text-gray-700">
                © 2024 Copyright:
                <a className="text-gray-800" href="https://wknd.site/">
            {' '}
            SB1 Footer
          </a>
        </div>
      </footer>
    </div>
  );
}
