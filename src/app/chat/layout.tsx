import { inter, playfair, spaceGrotesk } from '../fonts';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`relative min-h-screen ${inter.variable} ${playfair.variable} ${spaceGrotesk.variable}`}>
      <div className="inset-0 fixed z-20">
        {children}
      </div>
    </div>
  );
}
