import { pitches_types } from "@/app/data/pitch_data";

// Two arrays (ENG + JAP) for the names of all the types of pitch accents such as ()

const PitchItem = ({ kanji, furigana, pitch }: { kanji: string, furigana: string, pitch: Array<string> }) => {

    // Define a regular expression to match special Hiragana combinations and individual characters
    const regex = /しょ|じょ|りょ|にょ|ちょ|[^しょじょりょにょ]/g;

    // Split the word into individual letters according to regex
    // console.log(furigana);

    // This checks if the furigana is empty then use the kanji instead
    const textToUse = furigana == "" ? kanji : furigana;

    const furiganaArray = textToUse?.match(regex);

    if (!furiganaArray) return;

    // Get pitch type (if pitch >= 3 => pitch = 3 = 尾高)
    // const pitchHTML = CreatePitchTypeHTML(pitch);

    // Dynamically set the amount of columns in the grid depending on the word length (one column per letter)
    const gridInlineCss = {
        gridTemplateColumns: `repeat(${textToUse?.length}, 80px)`,
    }


    // Construct the html and styling here, then insert it in the within the return block
    const outputHTML = CreatePitchHTML(furiganaArray, pitch);

    return (
        <div key={kanji} className="pitch-item-inner-container">
            <div className="pitch-item-topheader">

                {kanji} - {/*pitchHTML*/}

            </div>
            <div className="grid-container" style={gridInlineCss}>

                {outputHTML}

            </div>
        </div>
    )
}

export default PitchItem

function CreatePitchTypeHTML(pitch: string[]) {
    const commaPitchItemEnd = pitch?.length > 1 ? ", " : "";

    // Add cases for different pitches such as: (副)(感)(名)(形動)
    // Adverb, Interjection, Noun, Adjectival Noun
    // Ask ChatGPT how to divide these values, for example: ちょいと		(副)0,1,(感)1


    // Get pitch type (if pitch >= 3 => pitch = 3 = 尾高)
    const pitchHTML = pitch?.map((object, i) => {

        let pitchType;

        if (Number(object) > 3) {
            pitchType = pitches_types[3];
        }
        else {
            console.log(pitch)
                pitchType = pitches_types[object];
        }

        return <span className="pl-1" key={i}>{pitchType["jp_kanji"]} ({pitchType["eng"]}){commaPitchItemEnd}</span>
    });

    return pitchHTML;
}

function CreatePitchHTML(furiganaArray: string[], pitch: string[]) {
    let outputHTML;

    pitch?.map((pitch) => {

        // Pitch type 0
        if (pitch == "0") {

            outputHTML = furiganaArray?.map((letter, i) => {
                if (i > 0) {
                    return <div key={i} className="pitch-line-top">{letter}</div>;
                }
                else {
                    return <div key={i}>{letter}</div>;
                }
            });
        }

        // Pitch type 1
        else if (pitch == "1") {

            outputHTML = furiganaArray?.map((letter, i) => {
                if (i == 0) {
                    return <div key={i} className="pitch-line-top pitch-line-tail">{letter}</div>;
                }
                // else if (i == 1) {
                //     return <div key={i} className="pitch-line-top pitch-line-tail">{letter}</div>;
                // }
                else {
                    return <div key={i}>{letter}</div>;
                }
            });
        }

        // Pitch type 2
        else if (pitch == "2") {

            outputHTML = furiganaArray?.map((letter, i) => {
                if (i == 1) {
                    return <div key={i} className="pitch-line-top pitch-line-tail">{letter}</div>;
                }
                else {
                    return <div key={i}>{letter}</div>;
                }
            });
        }

        // Pitch type 3...infinity
        else {

            outputHTML = furiganaArray?.map((letter, i) => {

                const final = Number(pitch) - 1;

                if (i == final) {
                    return <div key={i} className="pitch-line-top pitch-line-tail">{letter}</div>;
                }
                else if (i > 0 && i < final) {
                    return <div key={i} className="pitch-line-top">{letter}</div>;
                }
                else {
                    return <div key={i}>{letter}</div>;
                }
            });
        }

    });

    return outputHTML;
}