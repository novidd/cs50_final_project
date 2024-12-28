# Japanese Pitch Accent Dictionary
#### Video Demo:  <URL HERE>
#### Description:

## Introduction
Upon deciding on this project, I merged two interests: Japanese and programming. Specifically, I decided to create a dictionary that visualizes the pitch for a certain word in the form of a website. The pitch is what the user wants to know, not the meaning of the word, so it is not included, but it can be accessed by a provided link to [jisho.org](https://jisho.org/), a powerful Japanese-English dictionary.

It's important to note that in Japanese *homonyms* are very common, for example, if you input `き` you will get multiple words of the same reading but with different kanji and varying pitches. Therefore, to get a more accurate result you might input `木`(tree), `気`(spirit), or `期`(time period) instead to get the specific word you're looking for.

### Finding the resources

#### Pitch Data
The most convenient resource I found was the GitHub repository [kanjium](https://github.com/mifunetoshiro/kanjium/tree/master). I downloaded 
`kanjium/data/source_files/raw/accents.txt` which holds data entries/rows of $n>10^{6}$ where $n$ is the number of entries/rows.

`accents.txt` is a tabular text data file which follows the following structure: 
`kanji | hiragana | pitch`
- **kanji**: The word's reading with kanji,
- **hiragana**: The syllable reading of the word,
- **pitch**: Itemized with commas, for example, `4,2,1`. May have multiple pitches.

## Implementation
Identify the features on the website:
- Search field
- Pitch visualization

### Library & Framework
I decided to use **React** to create components with **Next.js** to handle the client-side components which includes creating getting the pitch data, and then displaying it on the page.

### Structure
Write about layout.tsx and page.tsx.

Write about the components I use, PitchItem, SearchList, and SearchPitches, and what each one does.

### Search

#### Search Algorithm

### Pitch

#### Pitch Visualization Algorithm
<!-- ![pitch visualization algorithm](./readme/pitch_algo.png) -->
The image below is my first notes on how the pitch works.
<img src="./readme/pitch_algo.png" width="600"/>

Below, the algorithm ``CreatePitchVisualAlgorithm`` is the code translated from the notes above:

`furiganaArray` is simply an array of all the word's characters.

``pitch`` is the type of pitch we are working on. There are four cases (if-statements) where ``pitch = ``
- "0"
- "1"
- "2"
- "3" and above.

```typescript
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
```

Each case creates a different visual and then returns the HTML. If the pitch has a value equal to or above 3 then the pitch will always follow the same pattern.

For example with input ``少女``(girl) we get this result:

<img src="./readme/pitch_result_example.png" width="800"/>

As you can see, we've received two readings as a result for ``少女``:
- ``おとめ``, pitch = 2
- ``しょうじょ`` pitch = 1

This is a case where a word can be read differently but written the same in kanji. Each word (``PitchItem``) has its pitches enumerated since a word can have multiple pitches.

``おとめ`` starts high in the middle and then low (中高) whereas ``しょうじょ`` starts high in the beginning and then low (頭高). In hindsight, I should have included these terms in the search results.