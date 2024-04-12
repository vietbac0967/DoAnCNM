import { ToastContainer } from 'react-toastify'
import './App.scss'
import AppRoutes from './routes/AppRoutes'
import { useDispatch, useSelector } from 'react-redux';
import { Grid, useMediaQuery, useTheme } from '@mui/material'
import Header from './component/Home/header/Header';
import Action from './component/Home/actions/Action';

function App() {

  const theme = useTheme();
  const mdup = useMediaQuery(theme.breakpoints.up('md'))

  const dispatch = useDispatch();
  const dataredux = useSelector((state) => state.userisaccess)

  return (
    <>
      {
        dataredux && dataredux.isAuthenticated ?
          <Grid className='app-container' container spacing={0} columns={12}>
            <Grid className='app-header' item xs={12}>
              <Header />
            </Grid>
            <Grid className='app-action' item xs={2} sm={1.3} md={0.8}>
              <Action />
            </Grid>
            <Grid className='app-frient' item xs={10} sm={10.7} md={11.2}>
              <AppRoutes />
            </Grid>
          </Grid>
          :
          <AppRoutes />
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
