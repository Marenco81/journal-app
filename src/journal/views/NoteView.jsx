import { SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useForm } from "../../hooks"
import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveNote, startSaveNote } from "../../store/journal"
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
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
     }, [messageSaved]);

     const onSaveNote = () => {
        dispatch(startSaveNote());
     }

     const onFileInputChange = ({target }) => {
        if(target.files === 0) return;

        console.log('subiendo archivos');
        // dispatch(startUploadingFiles(target.files)); 
     }
    
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
                sx={{fontSize:20}}
            >
                
                <UploadOutlined sx={{fontSize:25, mr:1}}/>
                Imágenes
            </IconButton>
            <Button
                disabled={isSaving}
                onClick={onSaveNote} 
                color="primary" 
                sx={{padding:2}}
            >
                <SaveOutlined sx={{fontSize:25, mr:1}}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
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
                placeholder="¿Qué sucedió el día de hoy?"
                minRows={5}
                name="body"
                value={body}
                onChange={onInputChange}
            />
        </Grid>

        {/* Galeria de imagenes */}
        <ImageGallery/>
        
    </Grid>
  )
}
