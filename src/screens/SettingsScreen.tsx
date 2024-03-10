import { AppHeader } from '../components/AppHeader'
import { AppFooter } from '../components/AppFooter'

export const SettingsScreen = () => {
  return (
    <div className="flex flex-col max-w-screen-sm mx-auto min-h-screen">
      <AppHeader page="settings" />
      <div className="pt-4 flex-1">
        <p>This is the settings page</p>
      </div>
      <AppFooter />
    </div>
  )
}
