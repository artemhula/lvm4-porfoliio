import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Github } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Проєкти — ArtemHulaDev" },
      { name: "description", content: "Мої проєкти: backend, fullstack та CLI інструменти. Кожна картка містить опис, технології та посилання." },
    ],
  }),
  component: ProjectsRoute,
});

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  repo: string;
  demo: string;
  accent: string;
};

const projects: Project[] = [
  {
    id: "01",
    title: "CloudScale Analytics",
    description: "Високопродуктивний рушій обробки даних у реальному часі, здатний обробляти понад 100 тис. подій/сек.",
    tags: ["Go", "Kafka", "ClickHouse"],
    repo: "https://github.com",
    demo: "https://example.com",
    accent: "bg-sky-400",
  },
  {
    id: "02",
    title: "Kub",
    description: "Панель моніторингу кластерів з автоматичним виявленням інцидентів та інтеграцією у Slack.",
    tags: ["TypeScript", "React", "K8s"],
    repo: "https://github.com",
    demo: "https://example.com",
    accent: "bg-purple-500",
  },
  {
    id: "03",
    title: "SecureAuth API",
    description: "Високонадійний провайдер OAuth2.0 реалізований на Rust. Відсутність помилок під час виконання.",
    tags: ["Rust", "PostgreSQL", "Redis"],
    repo: "https://github.com",
    demo: "https://example.com",
    accent: "bg-green-600",
  },
  {
    id: "04",
    title: "DevFlow CRM",
    description: "CRM наступного покоління для студій. Вбудовані agile-дошки, автоматичне виставлення рахунків та інтеграція з Git.",
    tags: ["Next.js", "Prisma", "tRPC"],
    repo: "https://github.com",
    demo: "https://example.com",
    accent: "bg-orange-500",
  },
  {
    id: "05",
    title: "FastGrid",
    description: "Високопродуктивна сітка даних для застосунків на React. Рендеринг мільйонів рядків із плавним прокручуванням.",
    tags: ["React", "Virtualization"],
    repo: "https://github.com",
    demo: "https://example.com",
    accent: "bg-primary",
  },
  {
    id: "06",
    title: "PixelForge",
    description: "CLI-інструмент для оптимізації зображень з підтримкою AVIF, WebP та автоматичною генерацією srcset.",
    tags: ["Node.js", "CLI", "Sharp"],
    repo: "https://github.com",
    demo: "https://example.com",
    accent: "bg-rose-500",
  },
];

function ProjectsRoute() {
  return (
    <SiteLayout>
      <ProjectsContent />
    </SiteLayout>
  );
}

function ProjectsContent() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <h1 className="text-5xl font-extrabold text-secondary">Мої проєкти</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Добірка моїх найкращих архітектурних рішень. Натисніть на картку, щоб переглянути код або демо.
      </p>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li
            key={p.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
          >
            <div className={`h-40 ${p.accent}`} aria-hidden="true" />
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-secondary">{p.title}</h2>
                <span className="text-xs font-mono text-muted-foreground">#{p.id}</span>
              </div>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <li key={t} className="rounded bg-muted px-2 py-0.5 text-xs text-secondary">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex gap-2">
                <Button asChild size="sm" variant="secondary" className="flex-1">
                  <a href={p.repo} target="_blank" rel="noreferrer">
                    <Github className="h-3.5 w-3.5" /> Код
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline" className="flex-1">
                  <a href={p.demo} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-3.5 w-3.5" /> Демо
                  </a>
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}