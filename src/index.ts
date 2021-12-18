import dotenv from 'dotenv'
dotenv.config()
import { getCollectionDoc, updateCollectionDoc } from './utility/firebase'
// import fs from 'fs'


const main = async() => {

  const treatise = await getCollectionDoc({
    collectionId: 'treatises',
    docId: "Giacomo Di GrassiRagione di adoprar sicuramente l'arme1570",
  })

//   fs.writeFile('Di Grassi', JSON.stringify(treatise), () => {})

  for (const book of Object.values(treatise.books).reverse() as any) {
    for (const chapter of Object.values(book.chapters).reverse() as any)
      if (chapter.chapterNumber > 30) {
        console.log((book as any).bookNumber + '/' + chapter.chapterNumber)
        const newChapterNumber: number = chapter.chapterNumber + 1
        const newChapter = {
          ...chapter,
          chapterNumber: newChapterNumber,
        }
        await updateCollectionDoc({
            collectionId: 'treatises',
            docId: "Giacomo Di GrassiRagione di adoprar sicuramente l'arme1570",
            key: `books.${book.bookNumber}.chapters.${newChapterNumber}`,
            value:newChapter,
        })
      }
  }
}

main()
