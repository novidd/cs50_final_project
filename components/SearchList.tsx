import { promises as fs } from 'fs';
import Image from 'next/image'
import PitchItem from './PitchItem';

const SearchList = async ({ query }: { query: string }) => {
    const accents = await fs.readFile(process.cwd() + '/app/data/accents.txt', 'utf8');
    const formatLines = accents.split("\n");

    const filteredPitches = formatLines.filter(item => {
        const stringArr = item.split("\t");

        
        // If the input is found in the accents either Onyomi or the Kunyomi reading, add to results
        // There can be multiple results of different words that have the same reading (homonym), but potentially different pitch accents
        if ((query == stringArr[0] || query == stringArr[1])) {
            // console.log(stringArr)
            return stringArr;
        }
    });


    return (
        <div className="pitch-item-parent-container pl-4 pr-4">
            <h1>Words</h1>

            {/* NEW PITCH ITEM STYLING STRUCTURE */}
            <div className='word-parent-container'>

                <div className='word-info-container'>

                    <div className="word-readings-container">
                        <span className="furigana">しょうじょ</span>
                        <span className="text">少女</span>
                    </div>

                    <div className='word-attributes'>
                        <div className='tag word-attribute-item word-attribute-item-common-word'>common word</div>
                        <div className='tag word-attribute-item word-attribute-jlpt'>jlpt n3</div>
                        <a className='word-attribute-link' target="_blank" href={`https://jisho.org/search/少女`}>Search Jisho for 少女</a>
                    </div>

                </div>

                <div className='word-pitch-data-result-list'>

                    <div className='word-pitch-container'>

                            <div className='word-pitch-data-container'>
                                <span className='pr-2'>1.</span>
                                <span className='tag word-pitch-data-dictionary'>Kanjium Pitch Accents</span>
                                <span className='word-characters-data'>
                                    <span>{/*girl (usu. between 7 and 17); young lady*/}​【しょうじょ】</span>
                                    <span>[1]</span>
                                </span>
                                <Image
                                    className='ml-2 word-pitch-data-button'
                                    src="/audio_64x64.svg"
                                    width={20}
                                    height={20}
                                    alt="audio playback"
                                />
                            </div>
                    
                            <div className='pitch-vizualizer-container'>
                                <span className='pitch-vizualizer-characters-container'>
                                    <span className='pitch-line-top pitch-line-tail'>しょ</span>
                                    <span>う</span>
                                    <span>じょ</span>
                                </span>
                            </div>
                    </div>

                </div>

            </div>

            {filteredPitches.map((item) => (
                <PitchItem key={item} kanji={item.split("\t")[0]} furigana={item.split("\t")[1]} pitch={item.split("\t")[2]?.split(",")} />
            ))}
        </div>
    )
}

// Create a component that visualizes the pitch accent, and all other information, pass in the result

export default SearchList
