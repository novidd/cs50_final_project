import { pitches_types } from "@/app/data/pitch_data";

// Two arrays (ENG + JAP) for the names of all the types of pitch accents such as ()

const PitchItem = ({ kanji, furigana, pitch }:{kanji: string, furigana: string, pitch: Array<string>}) => {

  const furiganaArray = furigana?.split('');

  if (!furiganaArray) return;

  const commaPitchItemEnd = pitch.length > 1 ? ", " : "";

  const gridInlineCss = {
    // gridTemplateColumns: `repeat(${furigana?.length}, 40px)`,
    gridTemplateColumns: `repeat(${5}, 40px)`,
  }

  return (
    <div key={kanji} className="pitch-item-inner-container">
      <div className="pitch-item-topheader">

        {kanji} -
        {pitch?.map((object) => (
          <span className="pl-1">{pitches_types[object]["jp_kanji"]} ({pitches_types[object]["eng"]}){commaPitchItemEnd}</span>
        ))}

      </div>
      <div className="grid-container" style={gridInlineCss}>

          {/* {furiganaArray?.map((object) => (
            <div key={object}>{object}</div>
          ))} */}

          <div className="pitch-line-top">し</div>
          <div className="pitch-line-top pitch-line-tail">ょ</div>
          <div>う</div>
          <div>じ</div>
          <div>ょ</div>

      </div>
    </div>
  )
}

export default PitchItem
