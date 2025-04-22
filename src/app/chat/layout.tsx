import { inter, josefinSans, spaceGrotesk } from '../fonts';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`relative min-h-screen ${inter.variable} ${josefinSans.variable} ${spaceGrotesk.variable}`}>
      <div className="inset-0 fixed z-20">
        {children}
      </div>
    </div>
  );
}
