import { ToastContainer } from 'react-toastify'
import './App.scss'
import AppRoutes from './routes/AppRoutes'
import { useDispatch, useSelector } from 'react-redux';
import { Grid, useMediaQuery, useTheme } from '@mui/material'
import Header from './component/Home/header/Header';
import Action from './component/Home/actions/Action';
import { useEffect, useState } from 'react';
import { handleCusttomClient } from './socket/socket';

function App() {

  const theme = useTheme();
  const mdup = useMediaQuery(theme.breakpoints.up('md'))

  const dispatch = useDispatch();
  const dataredux = useSelector((state) => state.userisaccess)
  const [user, setuser] = useState({})

  // useEffect(() => {
  //   if (dataredux.account) {
  //     handleCusttomClient({ customId: dataredux.account.phoneNumber })
  //   }
  // }, [])

  // useEffect(() => {
  //   if (dataredux.account) {
  //     handleCusttomClient({ customId: dataredux.account.phoneNumber })
  //   }
  // }, [dataredux])

  return (
    <>
      {
        dataredux && dataredux.isAuthenticated ?
          <Grid className='app-container' container spacing={0} columns={12}>
            <Grid className='app-header' item xs={12}>
              <Header />
            </Grid>
            <Grid className='app-action' item xs={2} sm={1.3} md={0.8}>
              <Action
                user={user}
                setuser={setuser}
                dataredux={dataredux}
              />
            </Grid>
            <Grid className='app-frient' item xs={10} sm={10.7} md={11.2}>
              <AppRoutes
                user={user}
                setuser={setuser}
              />
            </Grid>
          </Grid>
          :
          <AppRoutes
            user={user}
            setuser={setuser}
          />
      }
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
