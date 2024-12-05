import Link from "next/link";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function SubPageNav({ subPages, isCurrentPage }) {
    const sitePrefix = '/nb/smn';
    return (
        <div className="relative flex items-center justify-between h-16">
            <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                    {subPages?.map((item) => (
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
        </div>
    )
}
