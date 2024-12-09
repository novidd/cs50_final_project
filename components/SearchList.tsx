import { promises as fs } from 'fs';
import PitchItem from './PitchItem';

const SearchList = async ({ query }: { query: string }) => {
    const accents = await fs.readFile(process.cwd() + '/app/data/accents.txt', 'utf8');
    const formatLines = accents.split("\n");

    const filteredPitches = formatLines.filter(item => {
        const stringArr = item.split("\t");

        // If the input is found in the accents either Onyomi or the Kunyomi reading, add to results
        // There can be multiple results of different words that have the same reading (homonym), but potentially different pitch accents
        if ((query == stringArr[0] || query == stringArr[1]) && stringArr[1] != "") {
            // console.log(stringArr)
            return stringArr;
        }
    });


    return (
        <div className="pitch-item-parent-container">
            {filteredPitches.map((item) => (
                <PitchItem key={item} kanji={item.split("\t")[0]} furigana={item.split("\t")[1]} pitch={item.split("\t")[2]?.split(",")} />
            ))}
        </div>
    )
}

// Create a component that visualizes the pitch accent, and all other information, pass in the result

export default SearchList
