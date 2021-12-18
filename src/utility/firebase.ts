import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { firestore } from 'firebase-admin'

initializeApp({
  credential: applicationDefault(),
})
const db = firestore()

export const getCollection = async(
  { collectionId }: { collectionId: string },
) => {
  const snapshot = await db.collection(collectionId).get()
  return snapshot.docs
    .map(doc => ({ id: doc.id, data: doc.data() }))
    .reduce((collection, doc) => ({
      ...collection,
      [doc.id]: doc.data,
    }), {})
}

export const getCollectionDoc = async({collectionId, docId}: { collectionId: string, docId: string }): Promise<any> => {
  try {
    const response = await db.collection(collectionId).doc(docId).get()
    if (response.exists)
      return response.data()
    else
      throw new Error('Doc not existing')
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateCollectionDoc = async({collectionId, docId, key = '', value}) => {
  try {
    await db.collection(collectionId).doc(docId).update({
      [key]: value,
    })
    return true
  } catch (error) {
    console.error(error)
    throw new Error('Firebase error')
  }
}