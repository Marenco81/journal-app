import {Link as RouterLink } from "react-router-dom"
import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography} from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useDispatch } from "react-redux"
import { checkingAuthentication, startGoogleSignIn } from "../../store/auth/thunks"


export const LoginPage = () => {

  const dispatch = useDispatch();

  const {email, password, onInputChange} = useForm({
    email: 'alvaro@gmail.com',
    password: '123456'
  })

  const onSubmit = (event) => {
    event.preventDefault();

    console.log({email, password})
    dispatch(checkingAuthentication());
  }

  const onGoogleSignIn = () => {
    console.log('OnGoogleSignIn')
    dispatch(startGoogleSignIn());
  }

  return (
    <AuthLayout title="Login">

        <form onSubmit={onSubmit}>

          <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
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
                value={ password }
                onChange={ onInputChange }
              >
              </TextField>
            </Grid>

            <Grid container spacing={2} sx={{mt:2}}>
              <Grid item xs={12} sm={6}>
                <Button type="submit" variant="contained" fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button onClick={onGoogleSignIn} variant="contained" fullWidth>
                  <Google></Google>
                  <Typography sx={{ml:1}}>Google</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{mr:1, mt:2}}>¿No tienes una cuenta?</Typography>
              <Link component={RouterLink} color="inherit" to="/auth/register" sx={{mt:2}}>
                Crear una cuenta
              </Link>
              
            </Grid>

          </Grid>

        </form>

    </AuthLayout>

          
  )
}
