import Link from "next/link";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function PageNav({ pages, isCurrentPage }) {

    const sitePrefix = '/nb/smn'; // Doesnt work on author, mayby if port 4502, add prefix /content/sites/sb1/nb/smn instead
    //const sitePrefix = '';
    return (
        <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">

                {pages.map((item) => (
                    /*console.log('### item.name: ', item.name),
                    console.log('### item.href: ', item.href),*/

                    <Link key={item.name} href={sitePrefix + item.href}>
                        <a
                            aria-current={
                                isCurrentPage(sitePrefix + item.href) ? 'page' : undefined
                            }
                            className={classNames(
                                isCurrentPage(sitePrefix + item.href)
                                    ? 'bg-yellow-300 text-gray-700'
                                    : 'text-gray-800 hover:bg-yellow-200 hover:text-gray-700',
                                'px-3 py-2 rounded-md text-sm font-medium'
                            )}>
                            {item.name}
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    )
}
