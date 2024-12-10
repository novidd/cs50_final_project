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

    return (
        <div className="pitch-item-parent-container pl-4 pr-4">
            <h1>Words</h1>

            {filteredPitches.map((item) => (
                <PitchItem key={item} kanji={item.split("\t")[0]} furigana={item.split("\t")[1]} pitch={item.split("\t")[2]} />
            ))}

        </div>
    )
}

export default SearchList
