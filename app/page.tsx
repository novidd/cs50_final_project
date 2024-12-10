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

    const { query } = React.use(searchParams);

    // Add darkmode state here

    return (
        <main>
            <header>
                <h1 className='text-5xl'>Japanese (Dict)Pitchionary</h1>
            </header>

            <SearchPitches />
            <SearchList query={query} />

            <footer className='text-center pt-4 font-bold text-xs text-gray-500'>
                Made by Lucas Pettersson
                <br />
                This has been CS50.
            </footer>
        </main>
    );
}

export default Home;