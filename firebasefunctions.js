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
        phone: user.phone,
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

export function addAddress(address, addComplete){
    firebase.firestore()
    .collection('Addresses')
    .add({
        email: address.email,
        streetnumber: address.streetnumber,
        city: address.city,
        state: address.state,
        zip: address.zip,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .catch((error) => console.log(error))

}

export function addCarInfo(carinfo, addComplete){
    firebase.firestore()
    .collection('Car_Info')
    .add({
        email: carinfo.email,
        make: carinfo.make,
        model: carinfo.model,
        year: carinfo.year,
        license: carinfo.license,
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