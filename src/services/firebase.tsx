import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { User } from '../models/user';
import Snackbar from 'react-native-snackbar';
export class FirebaseAPI {
    usersCollection = firestore().collection('users');
    currentUser = auth().currentUser;

    constructor() {}

    async signOut() {
        try {
            await auth().signOut();
        } catch (err) {
            console.log(err?.code);
        }
    }

    async loginWithEmail(email: string, password: string) {
        try {
            await auth().signInWithEmailAndPassword(email, password);

            return true;
        } catch (error) {
            console.log(error?.code);
            if (error?.code === 'auth/wrong-password') {
                Snackbar.show({
                    text: 'Invalid email or password.',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'red',
                });
            } else {
                Snackbar.show({
                    text: error?.code,
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'red',
                });
            }

            return false;
        }
    }

    async signUpWithEmail(email: string, password: string, username: string) {
        try {
            const user = await auth().createUserWithEmailAndPassword(
                email,
                password,
            );

            await this.setupUserDBInfo(username);

            return true;
        } catch (error) {
            if (error?.code === 'auth/email-already-in-use') {
                Snackbar.show({
                    text: 'That email address is already in use!',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'red',
                });
            } else if (error?.code === 'auth/invalid-email') {
                Snackbar.show({
                    text: 'That email address is invalid!',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'red',
                });
            } else {
                Snackbar.show({
                    text: error?.code,
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'red',
                });
            }

            return false;
        }
    }
    async setupUserDBInfo(username: string) {
        const user = auth().currentUser;
        let image = 'https://bit.ly/3pnIBkI';

        const userData = {
            uid: user?.uid,
            email: user?.email,
            avatar: image,
            createdOn: firestore.Timestamp.now().toDate(),
            username: username,
            bio: '',
        };
        try {
            await this.usersCollection.doc(user?.uid).set(userData);
            return true;
        } catch (error) {
            Snackbar.show({
                text: 'An error occured.',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red',
            });
            return false;
        }
    }

    async updateUserDBInfo(user: User) {
        try {
            await this.usersCollection.doc(user.uid).update(user);
            Snackbar.show({
                text: 'Successfully Updated Profile',
                duration: Snackbar.LENGTH_LONG,
            });
        } catch (err) {
            Snackbar.show({
                text: 'An error occured.',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red',
            });
        }
    }

    async resetPassword() {
        try {
            return await auth().sendPasswordResetEmail(
                this.currentUser?.email ?? '',
            );
        } catch (err) {
            console.log(err?.message);
        }
    }
}
