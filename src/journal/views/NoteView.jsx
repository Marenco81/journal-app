import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useForm } from "../../hooks"
import { useMemo } from "react"
import { useSelector } from "react-redux"


export const NoteView = () => {

    const {active} = useSelector( state => state.journal);

     const {body, title, date, onInputChange, formState} = useForm(active);

     const dateString = useMemo(() => {
        const newDate = new Date (date)
        return newDate.toUTCString();
     }, [date]); 
    
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
            <Button color="primary" sx={{padding:2}}>
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
