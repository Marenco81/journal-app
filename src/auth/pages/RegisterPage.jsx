import {Link as RouterLink } from "react-router-dom"
import { Alert, Button, Grid, Link, TextField, Typography} from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formData = {
  email: '', // alvaro@gmail.com
  password: '', // 123456
  displayName: '' // Alvaro Marenco
  
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'The emailmust include an "@"'],
  password: [ (value) => value.length >= 6, 'The password must be at least 6 characters'],
  displayName: [ (value) => value.length >= 1 , 'The name must be at least 1 character'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch()

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {status, errorMessage} = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const { 
    formState, displayName, email, password, onInputChange, 
    isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations);


  const onSubmit = (event) => {
    event.preventDefault( )
    setFormSubmitted(true);

    if(!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  }
  return (
    <AuthLayout title="Register">
        <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__fast">
        
          <Grid container>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Full Name"
                type="text"
                placeholder="Full Name"
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText= {displayNameValid}
              >
              </TextField>
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Email"
                type="email"
                placeholder="example@gmail.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText= {emailValid}
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
                value={password}
                onChange={onInputChange}
                error={!!passwordValid && formSubmitted}
                helperText= {passwordValid}
              >
              </TextField>
            </Grid>

            <Grid container spacing={2} sx={{mt:2}}>
              <Grid 
                item 
                xs={12}
                display={!!errorMessage ? '' : 'none'}
              >
                <Alert severity="error"> {errorMessage} </Alert>
              </Grid>
              <Grid item xs={12}>
                <Button 
                  disabled={isCheckingAuthentication}
                  type="submit"
                  variant="contained" 
                  fullWidth>
                  Create account
                </Button>
              </Grid>
              
            </Grid>
            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{mr:1, mt:2}}>Already have an account?</Typography>
              <Link component={RouterLink} color="inherit" to="/auth/login" sx={{mt:2}}>
                Login
              </Link>
              
            </Grid>

          </Grid>

        </form>

    </AuthLayout>

          
  )
}
