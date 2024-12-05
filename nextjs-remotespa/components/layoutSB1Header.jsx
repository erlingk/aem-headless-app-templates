import {Disclosure} from "@headlessui/react";
import {MenuIcon, XIcon} from "@heroicons/react/outline";
import PageNav from "./layoutPageNav";
import {ActionButton, ButtonGroup} from "@sb1/ffe-buttons-react";
import SubPageNav from "./layoutSubPageNav";

const { NEXT_PUBLIC_URL } = process.env;

export default function SB1Header({ pages, subPages, isCurrentPage, open }) {
    return (
        <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button
                        className="inline-flex items-center justify-center p-2 text-gray-800 rounded-md hover:text-gray-700 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                            <XIcon className="block w-6 h-6" aria-hidden="true"/>
                        ) : (
                            <MenuIcon className="block w-6 h-6" aria-hidden="true"/>
                        )}
                    </Disclosure.Button>
                </div>

                <div
                    className="flex w-full items-center justify-between flex-1 sm:items-stretch sm:justify-start">
                    <PageNav pages={pages} isCurrentPage={isCurrentPage}/>
                    <div className="hidden sm:block sm:ml-6"/>
                    <div className="hidden sm:block sm:ml-6"/>

                    <div className="flex-grow"></div>

                    <div className="flex items-center flex-shrink-0">
                        <a href="/privat">
                            <img
                                className="block w-auto h-8 lg:hidden"
                                src={NEXT_PUBLIC_URL + '/logo.svg'}
                                alt="SB1"
                            />
                            <img
                                className="hidden w-auto h-8 lg:block"
                                src={NEXT_PUBLIC_URL + '/logo.svg'}
                                alt="SB1"
                            />
                        </a>
                    </div>

                    <div className="flex-grow"></div>

                    <div className="flex items-center flex-shrink-0">
                        <ButtonGroup thin={true}>
                            <ActionButton onClick={f => console.log('Søk')}>Søk</ActionButton>
                            <ActionButton onClick={f => console.log('Bli kunde')}>Bli kunde</ActionButton>
                            <ActionButton onClick={f => console.log('Login')}>Login</ActionButton>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
            <SubPageNav subPages={subPages} isCurrentPage={isCurrentPage}/>
        </div>
    )
}
