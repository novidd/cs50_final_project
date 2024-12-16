import { promises as fs } from 'fs';
import PitchItem from './PitchItem';

const SearchList = async ({ query }: { query: string }) => {
    const accents = await fs.readFile(process.cwd() + '/app/data/accents.txt', 'utf8');
    const formatLines = accents.split("\n");

    const filteredPitches = formatLines.filter(item => {
        const stringArr = item.split("\t");

        if ((query == stringArr[0] || query == stringArr[1])) {
            return stringArr;
        }
    });

    const exp = filteredPitches.length > 0 && filteredPitches[0] != "";

    const wordsHeader = exp ? <h1>Words - {filteredPitches.length}</h1> : "" ;
    const bottomItem = exp ? 
        <div className="h-[128px] flex justify-center pt-2 gap-1">
            <div className="dots"></div>
            <div className="dots"></div>
            <div className="dots"></div>
        </div> 
        : "";

    return (
        <div className="pitch-item-parent-container pl-4 pr-4">
            {wordsHeader}

            {filteredPitches.map((item) => (
                <PitchItem key={item} kanji={item.split("\t")[0]} furigana={item.split("\t")[1]} pitch={item.split("\t")[2]} />
            ))}

            {bottomItem}

        </div>
    )
}

export default SearchList
