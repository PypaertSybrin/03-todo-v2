import { createBrowserRouter } from 'react-router-dom'

import { TodoScreen } from '../screens/TodoScreen'
import { SettingsScreen } from '../screens/SettingsScreen'

const router = createBrowserRouter([
    {
      path: '/',
      element: <TodoScreen />,
    },
    {
      path: '/settings',
      element: <SettingsScreen />,
    },
    {
        path: '*',
        element: <h1>404</h1>,
    }
])
export default router
