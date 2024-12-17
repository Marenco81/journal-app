import {Link as RouterLink } from "react-router-dom"
import { Button, Grid, Link, TextField, Typography} from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks";

const formData = {
  email: 'alvaro@gmail.com',
  password: '123456',
  displayName: 'Alvaro Marenco'
  
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe incluir una @'],
  password: [ (value) => value.length >= 6, 'El password debe tener mas de 6 letras'],
  displayName: [ (value) => value.length >= 1 , 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const { 
    formState, displayName, email, password, onInputChange, 
    isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations);

  console.log(displayNameValid)

  const onSubmit = (event) => {
    event.preventDefault( )
    console.log(formState);
  }
  return (
    <AuthLayout title="Register">

        <form onSubmit={onSubmit}>

          <Grid container>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Nombre completo"
                type="text"
                placeholder="Nombre completo"
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={!displayNameValid}
                helperText= {displayNameValid}
              >
              </TextField>
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Correo"
                type="email"
                placeholder="example@gmail.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
              >
              </TextField>
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
              >
              </TextField>
            </Grid>

            <Grid container spacing={2} sx={{mt:2}}>
              <Grid item xs={12}>
                <Button 
                  type="submit"
                  variant="contained" 
                  fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
              
            </Grid>
            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{mr:1, mt:2}}>¿Ya tienes cuenta?</Typography>
              <Link component={RouterLink} color="inherit" to="/auth/login" sx={{mt:2}}>
                Ingresar
              </Link>
              
            </Grid>

          </Grid>

        </form>

    </AuthLayout>

          
  )
}
