import { CreateUserParams, GetMenuParams, SignInParams } from './../type.d';


import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    projectName: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME!,
    databaseId:process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
    categoryCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID!,
    menuCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_COLLECTIONS_ID!,
    customizationCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATION_COLLECTION_ID!,
    menuCustomizationCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATION_COLLECTION_ID!,
    bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!
}

export const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.projectName);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);


export const CreateUser = async ({name, email, password}: CreateUserParams) => {
    
    
    try {
        const appWriteAuthUser = await account.create(ID.unique(), email, password,name);

        if (!appWriteAuthUser) {
            throw new Error('User not created');
        }
        await SignIn({email, password});

        const avatarUrl = avatars.getInitialsURL(name);
        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                name,
                email,
                accountId: appWriteAuthUser.$id,
                avatar: avatarUrl
            }
        );
        
    } catch (error) {
        throw new Error(error as string);
    }
}

export const SignIn = async ({email, password}: SignInParams) => {

    try{
        const session = await account.createEmailPasswordSession(email, password);
        
    } catch (error) {
        throw new Error(error as string);
    }
    
}

export const getCurrentUser = async()=> {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) {
            throw new Error('User not found');
        }
        const currentUser = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser) {
            throw new Error('User not found');
        }

        return currentUser.documents[0];
    } catch (error) {
        throw new Error(error as string);
    }
}

export const getMenu = async({category, query}: GetMenuParams) => {
    try {
        const queries: string[] = [];
        
        if (category) {
            queries.push(Query.equal('category', category));
        }
        if (query) {
            queries.push(Query.search('name', query));
        }
        const menus = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries
        );
        
        return menus.documents;
    } catch (error) {
        throw new Error(error as string);
    }
}

export const getCategories = async() => {
    try {
        const categories = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoryCollectionId,
        );
        return categories.documents;
    } catch (error) {
        throw new Error(error as string);
    }
}