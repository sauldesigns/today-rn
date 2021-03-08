import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export class FirebaseAPI {
    usersCollection = firestore().collection('users');
    currentUser = auth().currentUser;

    constructor() {}

    async signOut() {
        try {
            return await auth()
                .signOut()
                .catch((err) => console.log(err.code));
        } catch {}
    }

    async loginWithEmail(email: string, password: string) {
        try {
            await auth().signInWithEmailAndPassword(email, password);

            return true;
        } catch (error) {
            console.error(error?.code);
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
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }
            console.error(error?.code);
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
            console.log(error);
            return false;
        }
    }

    async resetPassword() {
        try {
            return await auth().sendPasswordResetEmail(
                this.currentUser?.email ?? '',
            );
        } catch (err) {
            console.log(err.message);
        }
    }
}
