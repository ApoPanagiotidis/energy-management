export default function Template({ children }: { children: React.ReactNode }) {
  // Keep section backgrounds visible and stationary during hydration/navigation.
  // Animate individual content groups instead of fading the whole page.
  return <div className="flex flex-1 flex-col">{children}</div>;
}
