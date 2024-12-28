// import Image from 'next/image'

const PitchItem = ({ kanji, furigana, pitch }: { kanji: string, furigana: string, pitch: string }) => {

    // Define a regular expression to match special Hiragana combinations and individual characters
    const regex = /しょ|じょ|りょ|にょ|ちょ|ちゃ|./g;
    
    // This checks if the furigana is empty then use the kanji instead
    const textToUse = furigana == "" ? kanji : furigana;
    
    // Split the word into individual letters according to regex
    const furiganaArray = textToUse?.match(regex);

    if (!furiganaArray) return;

    // Filter the pitch, returns a an object with word type(s) and pitches if available, otherwise only an array of pitches
    const filteredPitch = parseInput(pitch);

    const pitchItemHTML = CreatePitchItem(furiganaArray, textToUse, filteredPitch);

    return (
        <div className='word-parent-container'>

            <div className='word-info-container'>

                <div className="word-readings-container">
                    <span className="furigana">{textToUse}</span>
                    <span className="text">{kanji}</span>
                </div>

                <div className='word-attributes'>
                    {/* <div className='tag word-attribute-item word-attribute-item-common-word'>common word</div>
                    <div className='tag word-attribute-item word-attribute-jlpt'>jlpt nX</div> */}
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

function CreatePitchItem(furiganaArray: string[], furigana: string, pitch: object | string[])
{
    let itemCount = 0;
    const pitchArray: string[] = [];
    const pitchTypeArray: string[] = [];

    // If array input ==> without type tags
    if (Array.isArray(pitch)) {
        pitch?.map((object) => {
            pitchTypeArray.push("");
            pitchArray.push(object);
        })
    }
    // If object input ==> with type tags
    else if (typeof pitch === "object" && pitch !== null) {
        for (const [type, values] of Object.entries(pitch)) {
            if (values.length > 0)
            {
                values?.map((item: string) => {
                    pitchTypeArray.push(type);
                    pitchArray.push(item);
                })

            }
        }
    }

    return pitchArray?.map((pitchItem: string, i) => {
        
        itemCount++;

        const pitchVisualHTML = CreatePitchVisualAlgorithm(furiganaArray, pitchItem);

        // Get the type tag in english
        const pitchTypeTagEng = pitchTypeArray[i] == "感" ? "int" 
            : pitchTypeArray[i] == "副" ? "adv"
            : pitchTypeArray[i] == "名" ? "noun" 
            : pitchTypeArray[i] == "形動" ? "adj-na": "";

        // Get the type tag html
        const pitchTypeTag = pitchTypeArray[i] == "" ? "" : <span className='tag word-pitch-data-type'>{}{pitchTypeArray[i]}.{pitchTypeTagEng}</span>;

        return (
            <>
                <div key={pitchItem} className='word-pitch-container'>

                    <div className='word-pitch-data-container'>
                        <span className='pr-2'>{itemCount}.</span>
                        <span className="tags-container">
                            <span className='tag word-pitch-data-dictionary'>Kanjium Pitch Accents</span>
                            {pitchTypeTag}
                        </span>
                        <span className='word-characters-data'>
                            <span>​【{furigana}】</span>
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

const parseInput = (input: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const types = ["名", "形動", "感", "副"];
    type TypeKey = typeof types[number]; // "名" | "形動" | "感" | "副"

    const result: Record<TypeKey, string[]> = {
        名: [],
        形動: [],
        感: [],
        副: []
    };

    const regex = /\((名|形動|感|副)\)([0-9,]*)/g;

    let match: RegExpExecArray | null;
    while ((match = regex.exec(input)) !== null) {
        const type = match[1] as TypeKey; // Explicitly cast match[1] to TypeKey
        const values = match[2].split(",").filter(v => v.trim() !== "");
        result[type].push(...values);
    }

    const hasTypes = Object.values(result).some(values => values.length > 0);
    if (!hasTypes) {
        const numericRegex = /^[0-9,]+$/;
        if (numericRegex.test(input)) {
            return input.split(",").map(v => v.trim()).filter(v => v !== "");
        }
    }

    return result;
};

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