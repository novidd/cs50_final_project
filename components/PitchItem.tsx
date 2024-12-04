import { pitches_types } from "@/app/data/pitch_data";

// Two arrays (ENG + JAP) for the names of all the types of pitch accents such as ()

const PitchItem = ({ kanji, furigana, pitch }:{kanji: string, furigana: string, pitch: Array<string>}) => {
  return (
    <div key={kanji} className="pitch-item-inner-container">
      <div className="pitch-item-topheader">{furigana} {pitch}</div>
      <div className="pitch-item-kanji-reading">{kanji}{pitches_types["0"]["jp_kanji"]}</div>
    </div>
  )
}

export default PitchItem
