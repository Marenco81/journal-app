export const startNewNote = () => {
    return async (dispatch, getState) => {

        const {uid} = getState().auth;
        //uid
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        //! dispatch
        // dispatch (newNote)
        // dispatch (activeNote)
    }
}