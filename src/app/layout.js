// app/layout.jsx
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/Providers";
import Navigation from "@/components/Navigation";
import PageTransitionWrapper from "@/components/PageTransitionWrapper"; // Importa el wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Catálogo de Muebles Minimalista",
  description: "Muebles modernos con diseño minimalista.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-background text-foreground`}>
      <ReduxProvider>
           {/* Envuelve el main con el PageTransitionWrapper */}
          <PageTransitionWrapper>
            <main className="pb-20"> {/* Padding para la barra de navegación inferior */}
              {children}
            </main>
          </PageTransitionWrapper>

          <Navigation /> {/* La navegación queda fuera del wrapper de animación */}
        </ReduxProvider>
      </body>
    </html>
  );
}