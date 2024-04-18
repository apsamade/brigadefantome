import '@styles/global.css'
import { LayoutRouter } from 'next/dist/server/app-render/entry-base'

export const metadata = {
    title: 'Game Game Room',
    description: 'Site officiel de la Game Game Room organisation de tournoi de jeux vidéo compétitif.'
}

const RootLayout = ({ children }) => {
    return(
        <html lang="fr">
        <head>
            <meta charset="UTF-8" />
        </head>
        <body>
            {children}
        </body>
        </html>
    )
}

export default RootLayout