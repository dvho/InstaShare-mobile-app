import constants from '../constants'

var initialState = {
    user: {photos: []}
}

export default(state = initialState, action) => {
    let newState = Object.assign({}, state)
    switch(action.type) {
        case constants.USER_RECEIVED:
        const user = {
            id: action.data[0].user,
            photos: action.data
        }
        newState.user = user
            return newState
        default:
            return state
    }
}
