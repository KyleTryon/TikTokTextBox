import { TikTokTextBox } from "./components/tiktok-textbox"


function App() {

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      padding: "0.4em",
      backgroundColor: "#d2d9d4",
      fontSize: "4em",
      gap: "0.2em",
    }}>
      <TikTokTextBox lines={["Align Left", "with two lines", "Third Line"]} align="left" fontFamily="Arial" bgColor="red" />
      <TikTokTextBox lines={["Align Center", "short", "Third Line"]} align="center" fontFamily="Proxima Nova Semibold" />
      <TikTokTextBox lines={["Align Right", "with two lines", "Third Line"]} align="right" bgColor="#FF683E" textColor="black" />
      <TikTokTextBox lines={["short1", "short"]} align="center" fontFamily="Proxima Nova Semibold" />
    </div>
  )
}

export default App
