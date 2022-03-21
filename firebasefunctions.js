import firebase from 'firebase';
import auth from './firebase'

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
        email: card.email,
        // name: user.name,
        number: card.number,
        type: card.type,
        cvv: card.cvv,
        expiry: card.expiry,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .catch((error) => console.log(error))

}

export function getCards() {
    firebase.firestore()
    .collection('Credit_Cards')
    .get()
    .then(snapshot => {
      snapshot
        .docs
        .forEach(doc => {
          console.log(JSON.parse(doc._document.data.toString()))
        });
    });
    // var cardList = [];

    // var snapshot = await firebase.firestore()
    // .collection('Credit_Cards')
    // .get()

    // snapshot.forEach((doc) => {
    //     cardList.push(doc.data());
    // })

    // cardsRetrieved(cardList)
}