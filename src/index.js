import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter ,RouterProvider} from "react-router-dom";
import ViewFiles from './components/ViewFiles';
import { AppProvider } from './AppContext';
const appRouter = createBrowserRouter([{
    
      path:"/",
      element:<App/>,
      children:[
       
        {
          path:"/viewFiles",
          element:<ViewFiles/>
        }
      ]
    
}])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>
  <AppProvider>
  <RouterProvider router={appRouter}/>
  </AppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
