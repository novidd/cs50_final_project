'use client'

import Image from 'next/image'

// Check if there are multiple words in the search such as: 魔法少女 魔法 and 少女 would be found

import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SearchPitches = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (searchTerm: string) => {
        const params = new URLSearchParams(searchParams);
        if (searchTerm) {
            params.set("query", searchTerm);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="input-form-container relative flex max-w-[62.5rem] w-[100%] flex-row justify-center">
            <div className="flex justify-center items-center">
                <Image
                    src="/search_icon.png"
                    width={24}
                    height={24}
                    alt="search"
                />
            </div>
            <input
                className="search-input-field peer block w-[100%] h-12 rounded-md border border-gray-200 py-[9px] pl-2 text-2xl outline-2 text-black"
                placeholder="Japanese (Hiragana, Kanji)"
                type="text"
                autoComplete="off"
                defaultValue={searchParams.get("query")?.toString()}
                onChange={(e) => {
                    handleSearch(e.target.value)
                }}
            />
        </div>
    )
}

export default SearchPitches

// export default function SearchPitches() {
//   return (
//     <form action={FormAction} id="search-form">
//       <div id="input-search-container">
//         {/* SEARCH ICON */}
//         <input id="accent-search-input" type="text" name="search" autoComplete="off" autoFocus placeholder="Japanese, Romaji..." required/>
//         <span id="input-search-shortcut-container">
//           <span id="input-search-shortcut">Ctrl</span>
//           <span id="input-search-shortcut">K</span>
//         </span>
//       </div>
//       <button type="submit" id="accent-search-button">Search</button>
//     </form>
//   );
// }