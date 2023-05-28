import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdArrowDropDown } from "react-icons/md";

function SearchDropdown({ searchType, setSearchType }) {
  return (
    <Menu
      as="div"
      className="relative h-full flex text-left w-[150px] border-r border-black"
    >
      <Menu.Button className="flex flex-row justify-between items-center bg-white h-full w-full rounded-tl-md rounded-bl-md px-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        {searchType}
        <MdArrowDropDown />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-30 left-0 mt-10 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {["Title", "Categories"].map((type) => {
            return (
              <div key={type} className="px-1 py-1 ">
                <Menu.Item>
                  <button
                    onClick={() => setSearchType(type)}
                    className={`group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {type}
                  </button>
                </Menu.Item>
              </div>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default SearchDropdown;
