// import Image from "next/image";
import * as React from 'react'

import SearchPitches from "@/components/SearchPitches";
import SearchList from "@/components/SearchList";

const Home = ({
    searchParams,
}: {
    searchParams?: {
        query?: string;
    };
}) => {
    // const query = searchParams?.query || '';

    const { query } = React.use(searchParams);

    // Add darkmode state here

    return (
        <main>
            <SearchPitches />
            <SearchList query={query} />
        </main>
    );
}

// <section>What is a pitch accent?</section>
// <section id="">How was this made?</section>

// <section className="section">ACTIONS: Randomize a word(s)</section>

// <section className="section input-parent-section">
// </section>

// return (
//   <form action={FormAction} id="search-form">
//   <div id="input-search-container">
//     {/* SEARCH ICON */}
//     <input id="accent-search-input" type="text" name="search" autoComplete="off" autoFocus placeholder="Japanese, Romaji..." required/>
//     <span id="input-search-shortcut-container">
//       <span id="input-search-shortcut">Ctrl</span>
//       <span id="input-search-shortcut">K</span>
//     </span>
//   </div>
//   <button type="submit" id="accent-search-button">Search</button>
// </form>
// );

export default Home;