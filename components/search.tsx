// import { promises as fs } from 'fs';

// export function Index({ stringArr }) {
//   return (
//     <div>
//       stringArr
//     </div>
//   );
// }

// export default Index;

// export async function getServerSideProps(context) {
//   // const fs = require('fs');
//   let fileInfo = fs.readFile('/app/data/accents.txt');

//   const file = await fs.readFile(process.cwd() + '/app/data/accents.txt', 'utf8');
//   // const data = JSON.parse(file);
  
//   // Example array item: "１０代\tじゅうだい\t1"
//   const formatLines = file.split("\n");
//   // console.log(formatLines)

//   formatLines.filter(item => {
//     const stringArr = item.split("\t");
    
    
//     // If the input is found in the accents either Onyomi or the Kunyomi reading, add to results
//     // There can be multiple results of different words that have the same reading (homonym), but potentially different pitch accents
//     if (context == stringArr[0] || context == stringArr[1]) {
//       // showAccentResult(stringArr);
//       console.log(stringArr)

//       return {
//         props: {
//           stringArr,
//         },
//       };
//     }
//   });
// }



//   // const file = await fs.readFile(process.cwd() + '/app/data/accents.txt', 'utf8');
//   // // const data = JSON.parse(file);
  
//   // // Example array item: "１０代\tじゅうだい\t1"
//   // const formatLines = file.split("\n");
//   // // console.log(formatLines)

//   // formatLines.filter(item => {
//   //   const stringArr = item.split("\t");
    
    
//   //   // If the input is found in the accents either Onyomi or the Kunyomi reading, add to results
//   //   // There can be multiple results of different words that have the same reading (homonym), but potentially different pitch accents
//   //   if (input == stringArr[0] || input == stringArr[1]) {
//   //     // showAccentResult(stringArr);
//   //     console.log(stringArr)
//   //   }
//   // });