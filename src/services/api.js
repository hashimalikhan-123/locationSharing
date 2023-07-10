import firestore from '@react-native-firebase/firestore';


export const addUser = async (body) => {
    let res = null
    await firestore()
        .collection('Users')
        .doc(body.userId).set(body)
        .then(() => {
            let result = { success: true, message: 'Location Shared Successfully!' }
            res = result
        })
        .catch((error) => {
            let result = { success: false, message: error }
            res = result
        })

    return res

}
export const checkUserByUserId = async (id) => {
    let res = null
    await firestore()
        .collection('Users').doc(id)
        .get()
        .then(response => {
            if (response.data() === undefined) {
                let result = { success: false, data: null }
                res = result
            }
            else {
                let result = { success: true, data: response.data() }
                res = result
            }
        })
        .catch((error) => {
            let result = { success: false, message: error }
            res = result
        })
    return res

}
export const updateUserPositionById = async (id, body) => {
    let res = null
    await firestore()
        .collection('Users').doc(id)
        .update(body)
        .then(() => {
            let result = { success: true, message: 'Updated Successfully!' }
            res = result
        })
        .catch((error) => {
            let result = { success: false, message: error }
            res = result

        })

    return res
}
export const getUsers = async () => {
    const result = []
    let res = null
    await firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                result.push(documentSnapshot.data())
            });
            let response = { success: true, data: result }
            res = response
        })
        .catch((error) => {
            let response = { success: false, message: error }
            res = response
        })
    return res

}
