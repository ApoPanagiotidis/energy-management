type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "light" | "dark";
};

export function PageIntro({ eyebrow, title, description, tone = "light" }: PageIntroProps) {
  const isDark = tone === "dark";

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24 lg:px-8">
      <p className={`text-xs font-semibold tracking-widest uppercase ${isDark ? "text-accent" : "text-brand"}`}>
        {eyebrow}
      </p>
      <h1 className={`mt-5 max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl ${isDark ? "text-white" : "text-brand"}`}>
        {title}
      </h1>
      <p className={`mt-6 max-w-2xl text-lg leading-8 text-pretty ${isDark ? "text-white/80" : "text-foreground"}`}>
        {description}
      </p>
    </section>
  );
}
