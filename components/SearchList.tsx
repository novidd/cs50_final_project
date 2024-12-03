import { promises as fs } from 'fs';

const SearchList = async ({ query }:{query: string}) => {
  const accents = await fs.readFile(process.cwd() + '/app/data/accents.txt', 'utf8');
  const formatLines = accents.split("\n");
  
  const filteredPitches = formatLines.filter(item => {
    const stringArr = item.split("\t");
    
    // If the input is found in the accents either Onyomi or the Kunyomi reading, add to results
    // There can be multiple results of different words that have the same reading (homonym), but potentially different pitch accents
    if (query == stringArr[0] || query == stringArr[1]) {
      return stringArr;
    }
    else {
      // result = ["Empty", "Empty", "Empty"]
    }
});


  return (
    <div>
      {filteredPitches.map((item) => (
        <>
          <div>{item}</div>
        </>
      ))}
    </div>
  )
}

// Create a component that visualizes the pitch accent, and all other information, pass in the result

export default SearchList
