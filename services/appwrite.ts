
import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    projectName: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME!,
    databaseId:process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!
}

export const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.projectName);

export const account = new Account(client);
export const database = new Databases(client);
export const avatars = new Avatars(client);


export const CreateUser = async ({name, email, password}: CreateUserParams) => {
    
    
    try {
        const appWriteAuthUser = await account.create(ID.unique(), name, email, password);

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