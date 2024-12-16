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
        <div className="w-[100%] flex justify-start items-center flex-col">
            <div className="pitches-pattern"></div>
            <main>
                <header>
                    <h1 className='text-4xl'>Japanese (Dict)Pitchionary</h1>
                </header>

                <SearchPitches />
                <SearchList query={query} />

                <footer className='text-center font-bold text-xs text-gray-500'>
                    <div>
                        Made by Lucas Pettersson
                        <br />
                        This has been CS50.
                    </div>
                    <div className="pitches-pattern mt-4"></div>
                </footer>
            </main>
        </div>
    );
}

export default Home;