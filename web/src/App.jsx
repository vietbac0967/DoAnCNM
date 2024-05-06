import { ToastContainer } from 'react-toastify'
import './App.scss'
import AppRoutes from './routes/AppRoutes'
import { ColorModeContext, useMode } from './theme';
import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import Sidebar from './scenes/global/Sidebar';
import { CssBaseline } from '@mui/material';
import Topbar from './scenes/global/TopBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './scenes/dashboard';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {/* <Sidebar isSidebar={isSidebar} /> */}
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
      {/* <AppRoutes />
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
      /> */}
    </>
  )
}

export default App
