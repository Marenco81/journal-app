import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updatedNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

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
};

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const {uid} = getState().auth;
        const {active } = getState().journal;

        const noteToFireStore = {...active};
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${active.id}`);
        await setDoc(docRef, noteToFireStore, {merge: true});

        dispatch(updatedNote(active));
    }
};

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());
        console.log(files);

        // await fileUpload(files[0]);
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
            
        }
        const photosUrls = await Promise.all(fileUploadPromises);
        console.log(photosUrls);
        dispatch(setPhotosToActiveNote(photosUrls));
    }
};

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        const {active} = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${active.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(active.id));
    }
}