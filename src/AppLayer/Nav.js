import { Fragment } from 'react'
import { Disclosure } from '@headlessui/react'

export default function Nav() {
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="shadow-md">
            <div className="text-xl font-semibold text-indigo-700 max-w-3xl px-2 sm:px-6 lg:px-8 m-auto relative flex h-16 items-center justify-between">
              Doolist
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}