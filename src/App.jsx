import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import AccessibilityToolbar from "@/components/AccessibilityToolbar"

function App() {
  return (
    <>
      <Pages />
      <Toaster />
      <AccessibilityToolbar />
    </>
  )
}

export default App;