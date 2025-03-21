import {Link as RouterLink } from "react-router-dom"
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Grid2, Link, TextField, Typography} from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useDispatch, useSelector } from "react-redux"
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks"
import { useMemo } from "react"

const formData = {
  email: '',
  password: ''
};

export const LoginPage = () => {

  const {status, errorMessage} = useSelector( state => state.auth );

  const dispatch = useDispatch();

  const {email, password, onInputChange} = useForm(formData);

  const isAuthenticating = useMemo( () => status === 'checking', [status] );

  const onSubmit = (event) => {
    event.preventDefault();

    // console.log({email, password})
    dispatch(startLoginWithEmailPassword( {email, password} ));
  }

  const onGoogleSignIn = () => {
    console.log('OnGoogleSignIn')
    dispatch(startGoogleSignIn());
  }

  return (
    <AuthLayout title="Login">

        <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__fast">
      

          <Grid container spacing={2} sx={{mb:2, mt:1}}>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Email"
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
                label="Password"
                type="password"
                placeholder="Password"
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
              >
              </TextField>
            </Grid>

            <Grid2 container>
              <Grid2
                item 
                xs={12}
                display={!!errorMessage ? '' : 'none'}
              >
                <Alert severity="error" sx={{ml:4}}> {errorMessage} </Alert>
              </Grid2>
            </Grid2>

            <Grid container spacing={2} sx={{mt:2}}>
              <Grid item xs={12} sm={6}>
                <Button 
                  disabled={isAuthenticating}
                  type="submit" 
                  variant="contained" 
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  disabled={isAuthenticating}
                  onClick={onGoogleSignIn} 
                  variant="contained" 
                  fullWidth
                >
                  <Google></Google>
                  <Typography sx={{ml:1}}>Google</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{mr:1, mt:2}}>Don't have an account yet?</Typography>
              <Link component={RouterLink} color="inherit" to="/auth/register" sx={{mt:2}}>
                Create an account
              </Link>
              
            </Grid>

          </Grid>

        </form>

    </AuthLayout>

          
  )
}
