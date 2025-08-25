import { ID } from 'react-native-appwrite'
import { appwriteConfig, database, storage } from './appwrite'
import dummyData from './data'

import * as FileSystem from 'expo-file-system'
import mime from 'mime'

interface Category {
  name: string
  description: string
}

interface Customization {
  name: string
  price: number
  type: 'topping' | 'side' | 'size' | 'crust' | string // extend as needed
}

interface MenuItem {
  name: string
  description: string
  image_url: string
  price: number
  rating: number
  calories: number
  protein: number
  category_name: string
  customizations: string[] // list of customization names
}

interface DummyData {
  categories: Category[]
  customizations: Customization[]
  menu: MenuItem[]
}

// ensure dummyData has correct shape
const data = dummyData as DummyData

async function clearAll (collectionId: string): Promise<void> {
  const list = await database.listDocuments(
    appwriteConfig.databaseId,
    collectionId
  )

  await Promise.all(
    list.documents.map(doc =>
      database.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
    )
  )
}

async function clearStorage (): Promise<void> {
  const list = await storage.listFiles(appwriteConfig.bucketId)

  await Promise.all(
    list.files.map(file =>
      storage.deleteFile(appwriteConfig.bucketId, file.$id)
    )
  )
}


/*
async function uploadImageToStorage(imageUrl: string) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const fileObj = {
        name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
        type: blob.type,
        size: blob.size,
        uri: imageUrl,
    };

    const file = await storage.createFile(
        appwriteConfig.bucketId,
        ID.unique(),
        fileObj
    );

    return storage.getFileViewURL(appwriteConfig.bucketId, file.$id);
}
    */

//the uploadImageToStorage function above doesn't work in Expo Go because it requires file system access
//so we use expo-file-system to download the image first and then upload it to Appwrite Storage
//the following function does that using expo-file-system and mime packages

async function uploadImageToStorage (imageUrl: string) {
  try {
    // Step 1: Extract file name from URL
    const fileName = imageUrl.split('/').pop() || `file-${Date.now()}.jpg`

    // Step 2: Define local path to store downloaded image
    const localUri = FileSystem.documentDirectory + fileName

    // Step 3: Download image to local filesystem
    const downloadResumable = FileSystem.createDownloadResumable(
      imageUrl,
      localUri
    )
    const downloadResult = await downloadResumable.downloadAsync()
    let uri
    if (downloadResult && downloadResult.uri) {
      uri = downloadResult.uri
      // rest of the code using the uri
    } else {
      // handle the case where uri is not available
      throw new Error('Failed to download image')
    }

    // Step 4: Get MIME type using `mime` package
    const mimeType = mime.getType(uri) || 'application/octet-stream'

    // Step 5: Create a valid file object for Appwrite

    const fileInfo = await FileSystem.getInfoAsync(uri)
    const fileSize = (fileInfo as { size: number }).size || 0
    const file = {
      uri, // local file path
      name: fileName,
      type: mimeType,
      size: fileSize
    }

    // Step 6: Upload to Appwrite Storage
    const uploadedFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      file
    )

    // Step 7: Return public URL to the file
    return storage.getFileViewURL(appwriteConfig.bucketId, uploadedFile.$id)
  } catch (error) {
    console.error('❌ Failed to upload image:', error)
    throw error
  }
}

async function seed (): Promise<void> {
  // 1. Clear all
  await clearAll(appwriteConfig.categoryCollectionId)
  await clearAll(appwriteConfig.customizationCollectionId)
  await clearAll(appwriteConfig.menuCollectionId)
  await clearAll(appwriteConfig.menuCustomizationCollectionId)
  await clearStorage()

  // 2. Create Categories
  const categoryMap: Record<string, string> = {}
  for (const cat of data.categories) {
    const doc = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.categoryCollectionId,
      ID.unique(),
      cat
    )
    categoryMap[cat.name] = doc.$id
  }

  // 3. Create Customizations
  const customizationMap: Record<string, string> = {}
  for (const cus of data.customizations) {
    const doc = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.customizationCollectionId,
      ID.unique(),
      {
        name: cus.name,
        price: cus.price,
        type: cus.type
      }
    )
    customizationMap[cus.name] = doc.$id
  }

  // 4. Create Menu Items
  const menuMap: Record<string, string> = {}
  for (const item of data.menu) {
    const uploadedImage = await uploadImageToStorage(item.image_url);
    //const uploadedImage = item.image_url // Skip upload for now

    const doc = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      ID.unique(),
      {
        name: item.name,
        description: item.description,
        image_url: uploadedImage,
        price: item.price,
        rating: item.rating,
        calories: item.calories,
        protein: item.protein,
        categories: categoryMap[item.category_name]
      }
    )

    menuMap[item.name] = doc.$id

    // 5. Create menu_customizations
    for (const cusName of item.customizations) {
      await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.menuCustomizationCollectionId,
        ID.unique(),
        {
          menu: doc.$id,
          customizations: customizationMap[cusName]
        }
      )
    }
  }

  console.log('✅ Seeding complete.')
}

export default seed
