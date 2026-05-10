import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакти — ArtemHulaDev" },
      { name: "description", content: "Зв'яжіться зі мною: пошта, телефон, локація та форма зворотного зв'язку." },
    ],
  }),
  component: ContactsRoute,
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Ім'я має містити щонайменше 2 символи").max(100),
  email: z.string().trim().email("Невірний email").max(255),
  message: z.string().trim().min(10, "Повідомлення занадто коротке").max(1000),
});

type FormErrors = Partial<Record<"name" | "email" | "message", string>>;

function ContactsRoute() {
  return (
    <SiteLayout>
      <Toaster />
      <ContactsPage />
    </SiteLayout>
  );
}

function ContactsPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fe: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormErrors;
        if (!fe[key]) fe[key] = issue.message;
      }
      setErrors(fe);
      return;
    }
    setErrors({});
    setLoading(true);
    // mock send
    await new Promise((r) => setTimeout(r, 800));
    console.log("Sent contact form:", parsed.data);
    toast.success("Повідомлення надіслано!", {
      description: `Дякую, ${parsed.data.name}. Я зв'яжуся з вами незабаром.`,
    });
    setForm({ name: "", email: "", message: "" });
    setLoading(false);
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <span className="font-mono text-sm text-primary">// зв'яжіться зі мною</span>
      <h1 className="mt-2 text-5xl font-extrabold text-secondary">Контакти</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Наразі я відкритий для фріланс-замовлень або повної зайнятості. Якщо у вас є проєкт,
        що потребує трохи магії коду — напишіть мені.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <ContactRow icon={<Mail />} label="Ел. пошта" value="artemgul4@gmail.com" />
          <ContactRow icon={<Phone />} label="Телефон" value="+380000123123" />
          <ContactRow icon={<MapPin />} label="Локація" value="Одеса, Україна" />

          <div className="pt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Соціальні мережі
            </h2>
            <div className="mt-3 flex gap-3">
              <SocialIcon href="https://github.com" label="GitHub"><Github className="h-5 w-5" /></SocialIcon>
              <SocialIcon href="https://linkedin.com" label="LinkedIn"><Linkedin className="h-5 w-5" /></SocialIcon>
              <SocialIcon href="https://twitter.com" label="Twitter"><Twitter className="h-5 w-5" /></SocialIcon>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-secondary bg-secondary p-6 text-secondary-foreground"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-xs uppercase tracking-wider text-primary">Хто ви?</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Введіть ваше ім'я..."
                className="mt-1 border-primary/30 bg-secondary text-secondary-foreground placeholder:text-muted-foreground"
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="text-xs uppercase tracking-wider text-primary">Зворотна адреса</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="test@email.com"
                className="mt-1 border-primary/30 bg-secondary text-secondary-foreground placeholder:text-muted-foreground"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="message" className="text-xs uppercase tracking-wider text-primary">Повідомлення</Label>
              <Textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Напишіть ваше повідомлення тут..."
                className="mt-1 border-primary/30 bg-secondary text-secondary-foreground placeholder:text-muted-foreground"
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>
            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? "Надсилання..." : <>Надіслати <Send className="h-4 w-4" /></>}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-secondary">
        {icon}
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="font-medium text-secondary">{value}</div>
      </div>
    </div>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-secondary transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </a>
  );
}