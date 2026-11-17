import { Outlet } from 'react-router-dom'

const ChatLayout = () => {
  return (
     <main className="relative w-full">
        <Outlet />
    </main>
  )
}

export default ChatLayout
