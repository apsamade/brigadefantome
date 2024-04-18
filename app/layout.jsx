import '@styles/global.css'

export const metadata = {
    title: 'Brigade Fantôme',
    description: 'Site officiel de la Brigade Fantôme organisation de tournoi de jeux vidéo compétitif.'
}

const RootLayout = ({ children }) => {
    return (
        <html lang="fr">
            <head>
                <meta name="author" content="Abdel-Samade Bouderga" />
                <meta name="robots" content="index, follow" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="fr_FR" />
                <link rel="shortcut icon" href="/logo/logo_brigade_2.png" type="image/x-icon" />
                <meta charset="UTF-8" />
                <meta property="og:title" content="Tournoi de la Brigade Fantôme" />
                <meta property="og:description" content="Site officiel de la Brigade Fantôme organisation de tournoi de jeux vidéo compétitif tel que Warzone / League of Legends / NBA et autre." />
                <meta property="og:image" content="/logo/logo_brigade_2.png" />
                <meta property="og:url" content="https://brigadefantome.vercel.app/" />

            </head>
            <body>
                {children}
            </body>
        </html>
    )
}

export default RootLayout