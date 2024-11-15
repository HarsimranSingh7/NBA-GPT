
import "./global.css"

export const metadata = {
  title: "NBAGPT",
  description: "Go to place for all NBA enthusiasts .",

}

const RootLayout =({children}) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

export default RootLayout