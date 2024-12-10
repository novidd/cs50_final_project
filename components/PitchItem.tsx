import { pitches_types } from "@/app/data/pitch_data";
import Image from 'next/image'

// Two arrays (ENG + JAP) for the names of all the types of pitch accents such as ()

const PitchItem = ({ kanji, furigana, pitch }: { kanji: string, furigana: string, pitch: Array<string> }) => {

    // Define a regular expression to match special Hiragana combinations and individual characters
    const regex = /しょ|じょ|りょ|にょ|ちょ|./g;
    
    // This checks if the furigana is empty then use the kanji instead
    const textToUse = furigana == "" ? kanji : furigana;
    
    // Split the word into individual letters according to regex
    const furiganaArray = textToUse?.match(regex);

    if (!furiganaArray) return;

    // ADD HERE TO FILTER THE PITCH TO ACCESS IF ADVERB, NOUN, OR INTERJECTION

    const pitchItemHTML = CreatePitchItem(furiganaArray, textToUse, pitch);

    return (
        <div className='word-parent-container'>

            <div className='word-info-container'>

                <div className="word-readings-container">
                    <span className="furigana">{textToUse}</span>
                    <span className="text">{kanji}</span>
                </div>

                <div className='word-attributes'>
                    {/* <div className='tag word-attribute-item word-attribute-item-common-word'>common word</div> */}
                    {/* <div className='tag word-attribute-item word-attribute-jlpt'>jlpt n3</div> */}
                    <a className='word-attribute-link' target="_blank" href={`https://jisho.org/search/${kanji}`}>Search Jisho for {kanji}</a>
                </div>

            </div>

            <div className='word-pitch-data-result-list'>

                {/* HERE LOOP THROUGH ALL THE PITCHES */}
                {pitchItemHTML}

            </div>

        </div>
    )
}

export default PitchItem

// function CreatePitchTypeHTML(pitch: string[]) {
//     const commaPitchItemEnd = pitch?.length > 1 ? ", " : "";

//     // Add cases for different pitches such as: (副)(感)(名)(形動)
//     // Adverb, Interjection, Noun, Adjectival Noun
//     // Ask ChatGPT how to divide these values, for example: ちょいと		(副)0,1,(感)1


//     // Get pitch type (if pitch >= 3 => pitch = 3 = 尾高)
//     const pitchHTML = pitch?.map((object, i) => {

//         let pitchType;

//         if (Number(object) > 3) {
//             pitchType = pitches_types[3];
//         }
//         else {
//             console.log(pitch)
//                 pitchType = pitches_types[object];
//         }

//         return <span className="pl-1" key={i}>{pitchType["jp_kanji"]} ({pitchType["eng"]}){commaPitchItemEnd}</span>
//     });

//     return pitchHTML;
// }

function CreatePitchItem(furiganaArray: string[], furigana: string, pitch: string[])
{
    let itemCount = 0;

    return pitch?.map((pitchItem) => {
        
        const pitchVisualHTML = CreatePitchVisualAlgorithm(furiganaArray, pitchItem);

        itemCount++;

        return (
            <>
                <div className='word-pitch-container'>
                    <div className='word-pitch-data-container'>
                        <span className='pr-2'>{itemCount}.</span>
                        <span className='tag word-pitch-data-dictionary'>Kanjium Pitch Accents</span>
                        <span className='word-characters-data'>
                            <span>{/*girl (usu. between 7 and 17); young lady*/}​【{furigana}】</span>
                            <span>[{pitchItem}]</span>
                        </span>
                        {/* <Image
                            className='ml-2 word-pitch-data-button'
                            src="/audio_64x64.svg"
                            width={20}
                            height={20}
                            alt="audio playback"
                        /> */}
                    </div>

                    <div className='pitch-vizualizer-container'>
                        <span className='pitch-vizualizer-characters-container'>
                            {pitchVisualHTML}
                        </span>
                    </div>
                </div>
            </>
        )
    });
}

function CreatePitchVisualAlgorithm(furiganaArray: string[], pitch: string) {
    let outputHTML;

    // Pitch type 0
    if (pitch == "0") {

        outputHTML = furiganaArray?.map((letter, i) => {
            if (i > 0) {
                return <span key={i} className="pitch-line-top">{letter}</span>;
            }
            else {
                return <span key={i}>{letter}</span>;
            }
        });
    }

    // Pitch type 1
    else if (pitch == "1") {

        outputHTML = furiganaArray?.map((letter, i) => {
            if (i == 0) {
                return <span key={i} className="pitch-line-top pitch-line-tail">{letter}</span>;
            }
            else {
                    return <span key={i}>{letter}</span>;
            }
        });
    }

    // Pitch type 2
    else if (pitch == "2") {

        outputHTML = furiganaArray?.map((letter, i) => {
            if (i == 1) {
                return <span key={i} className="pitch-line-top pitch-line-tail">{letter}</span>;
            }
            else {
                return <span key={i}>{letter}</span>;
            }
        });
    }

    // Pitch type 3...infinity
    else if (Number(pitch) >= 3) {

        outputHTML = furiganaArray?.map((letter, i) => {

            const final = Number(pitch) - 1;

            if (i == final) {
                return <span key={i} className="pitch-line-top pitch-line-tail">{letter}</span>;
            }
            else if (i > 0 && i < final) {
                return <span key={i} className="pitch-line-top">{letter}</span>;
            }
            else {
                return <span key={i}>{letter}</span>;
            }
        });
    }

    return outputHTML;
}