import ThemeButton from '@/components/ThemeButton/ThemeButton'
import { useTheme } from '@/hooks/useTheme';
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  const { setTheme } = useTheme();
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-muted/30 px-4 py-10">
      <ThemeButton setTheme={setTheme} isFloating />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/10 to-transparent"
      />
       
      <div className="relative w-full">
        <Outlet />
      </div>
    </main>
  )
}

export default AuthLayout
