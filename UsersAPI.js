import * as firebase from "firebase";

export function addUser(user, addComplete){
    firebase.firestore()
    .collection('Users')
    .add({
        email: user.email,
        password: user.password,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then((data) => addComplete(data))
    .catch((error) => console.log(error));

}

export async function getUsers(usersRetrieved){

    var userList = [];

    var snapshot = await firebase.firestore()
    .collection('Users')
    .orderBy('createdAt')
    .get()

    snapshot.forEach((doc) => {
        userList.push(doc.data());
    });

    usersRetrieved(userList);
}