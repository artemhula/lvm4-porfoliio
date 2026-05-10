import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/layout/SiteLayout";
import profilePhoto from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Головна — ArtemHulaDev" },
      { name: "description", content: "Middle Software Engineer з 5-річним досвідом у full-stack розробці. Дивіться мої проєкти, стек та зв'яжіться зі мною." },
    ],
  }),
  component: Index,
});

const stack = ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "Rust"];
const stats = [
  { value: "5", label: "років досвіду" },
  { value: "10+", label: "запущених проєктів" },
  { value: "10+", label: "задоволених клієнтів" },
];

function Index() {
  return (
    <SiteLayout>
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
              ⚡ Шукаю роботу
            </span>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight text-secondary md:text-6xl">
              Створюю масштабовані{" "}
              <span className="text-primary">архітектури</span>
            </h1>
            <p className="mt-6 max-w-lg text-base text-muted-foreground">
              Middle Software Engineer з 5-річним досвідом у full-stack розробці,
              хмарних системах та високопродуктивних API.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/projects">
                  Переглянути проєкти <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contacts">
                  <Mail className="h-4 w-4" /> Зв'язатися
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 -translate-x-3 translate-y-3 rounded-2xl bg-primary" />
              <img
                src={profilePhoto}
                alt="Фото Artem Hula, Middle Software Engineer"
                width={400}
                height={400}
                className="relative h-80 w-80 rounded-2xl border-4 border-secondary object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 border-t border-border pt-10">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-primary md:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <h2 className="text-3xl font-bold text-secondary">Про мене</h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          Я інженер програмного забезпечення, керований цікавістю та пристрастю до створення цифрового
          досвіду, який є одночасно продуктивним та естетичним. Мій шлях почався із захопленості тим,
          як все працює в інтернеті, що привело до кар'єри у створенні додатків корпоративного рівня.
        </p>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Я спеціалізуюся на розподілених системах і вірю, що прості рішення часто є найбільш надійними.
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-24 pt-4">
        <h2 className="text-3xl font-bold text-secondary">Технічний стек</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {stack.map((t) => (
            <li
              key={t}
              className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-primary hover:text-primary"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
