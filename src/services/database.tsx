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

    async addBookmark(item: ArticleElement | undefined) {
        try {
            if (item) {
                const doesNotExist = await this.checkIfBookmarkExists(item);
                if (doesNotExist) {
                    await this.bookmarksCollection.add(item);
                    return true;
                }
                Snackbar.show({
                    text: 'This article has already been bookmarked.',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'red',
                });
                return false;
            }
            return false;
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

    async checkIfBookmarkExists(item: ArticleElement | undefined) {
        try {
            if (item) {
                const result = await this.bookmarksCollection
                    .where('title', '==', item.title)
                    .get();
                return result.empty;
            }
        } catch (err) {
            console.log(err?.code);
            return false;
        }
    }

    async checkIfReaadLaterExists(item: ArticleElement | undefined) {
        try {
            if (item) {
                const result = await this.readLaterCollection
                    .where('title', '==', item?.title)
                    .get();
                return result.empty;
            }
        } catch (err) {
            console.log(err?.code);
            return false;
        }
    }

    getTopHeadlineBookmark() {
        return this.bookmarksCollection;
    }

    async toggleHeadlineBookmark(
        item: ArticleElement | undefined,
        toggle: boolean,
    ) {
        try {
            if (toggle) {
                const result = await this.bookmarksCollection
                    .where('title', '==', item?.title)
                    .get();

                await this.deleteSaved(result?.docs[0]?.id, true);

                return false;
            } else {
                await this.addBookmark(item);
                return true;
            }
        } catch (err) {
            console.log(err);
            console.log('error');
            return false;
        }
    }

    async deleteSaved(docID: string, isBookmark = false) {
        try {
            isBookmark
                ? await this.bookmarksCollection.doc(docID).delete()
                : await this.readLaterCollection.doc(docID).delete();
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

    async addReadLater(item: ArticleElement) {
        try {
            const doesNotExist = await this.checkIfReaadLaterExists(item);
            if (doesNotExist) {
                await this.readLaterCollection.add(item);
                return true;
            }
            Snackbar.show({
                text: 'This article has already been saved.',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red',
            });
            return false;
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
