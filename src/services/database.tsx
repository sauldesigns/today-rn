import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import { CollectionTypes } from '../constants/collections';
import { ArticleElement } from '../models/articles';

export class DatabaseAPI {
    usersCollection = firestore().collection(CollectionTypes.USERS);

    bookmarksCollection = firestore()
        .collection(CollectionTypes.USERS)
        .doc(auth().currentUser?.uid)
        .collection(CollectionTypes.BOOKMARKS);

    readLaterCollection = firestore()
        .collection(CollectionTypes.USERS)
        .doc(auth().currentUser?.uid)
        .collection(CollectionTypes.READ_LATER);

    currentUser = auth().currentUser;

    constructor() {}

    async addBookmark(item: ArticleElement) {
        try {
            await this.bookmarksCollection.add(item);
            return true;
        } catch (err) {
            Snackbar.show({
                text: 'An error occured.',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red',
            });
            console.log(err?.code);
            return false;
        }
    }

    async deleteBookmark(docID: string) {}

    async addReadLater(item: ArticleElement) {
        try {
            await this.readLaterCollection.add(item);
            return true;
        } catch (err) {
            Snackbar.show({
                text: 'An error occured.',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red',
            });
            console.log(err?.code);
            return false;
        }
    }

    async deleteReadLater(docID: string) {}
}
