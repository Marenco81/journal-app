import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "./journalSlice";
import { loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch (savingNewNote() );

        const {uid} = getState().auth;
        //uid
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        const setDocResp = await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        // console.log({newDoc, setDocResp});

        //! dispatch
        dispatch (addNewEmptyNote (newNote));
        dispatch (setActiveNote (newNote));
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes(uid);
        dispatch (setNotes(notes));
    }
}