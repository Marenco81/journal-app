import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, Grid2, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useForm } from "../../hooks"
import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'


export const NoteView = () => {

    const dispatch = useDispatch();

    const {active, messageSaved, isSaving} = useSelector( state => state.journal);

     const {body, title, date, onInputChange, formState} = useForm(active);

     const dateString = useMemo(() => {
        const newDate = new Date (date)
        return newDate.toUTCString();
     }, [date]); 

     const fileInputRef = useRef();

     useEffect(() => {
        dispatch(setActiveNote(formState));
     }, [formState]);

     useEffect(() => {
        if(messageSaved.length > 0) {
            Swal.fire('Note updated', messageSaved, 'success');
        }
     }, [messageSaved]);

     const onSaveNote = () => {
        dispatch(startSaveNote());
     };

     const onFileInputChange = ({target }) => {
        if(target.files === 0) return;

        console.log('subiendo archivos');
        dispatch(startUploadingFiles(target.files)); 
     };

     const onDelete = () => {
        dispatch(startDeletingNote());
     };
    
  return (
    <Grid 
        className="animate__animated animate__fadeIn animate__fast"
        container 
        direction='row' 
        justifyContent='space-between' 
        alignItems='center' 
        sx={{mb:1}}>
        <Grid item>
            <Typography fontSize={25} fontWeight='light'>
                { dateString }
            </Typography>
        </Grid>
        <Grid item>
            
            <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={onFileInputChange}
                style={{display:'none'}}
            />

            <IconButton 
                color="primary"
                disabled={isSaving}
                onClick={() => fileInputRef.current.click()}
                sx={{fontSize:17}}
            >
                
                <UploadOutlined sx={{fontSize:25, mr:1}}/>
                Images
            </IconButton>
            <Button
                disabled={isSaving}
                onClick={onSaveNote} 
                color="primary" 
                sx={{padding:2}}
            >
                <SaveOutlined sx={{fontSize:25, mr:1}}/>
                Save
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Type a title"
                label="Title"
                sx={{border:'none', mb:1}}
                name="title"
                value={title}
                onChange={onInputChange}
            />
            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="What happened today?"
                minRows={5}
                name="body"
                value={body}
                onChange={onInputChange}
            />
        </Grid>

        <Grid2>
            <Button
                onClick={onDelete}
                sx={{mt:2}}
                color="error"
            >
                <DeleteOutline/>
                Delete Note
            </Button>
        </Grid2>

        {/* Galeria de imagenes */}
        <ImageGallery
            images={active.imageUrls}
        />
        
    </Grid>
  )
}
