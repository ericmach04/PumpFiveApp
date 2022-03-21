import firebase from 'firebase';

export function addUser(user, addComplete){
    firebase.firestore()
    .collection('Users')
    .add({
        email: user.email,
        password: user.password,
        fname: user.fname,
        lname: user.lname,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .catch((error) => console.log(error))

}
export function addCard(card, addComplete){
    firebase.firestore()
    .collection('Credit_Cards')
    .add({
        email: user.email,
        name: user.name,
        number: user.number,
        type: user.type,
        cvv: user.cvv,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .catch((error) => console.log(error))

}