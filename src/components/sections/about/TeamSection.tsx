import Image from "next/image";
import Link from "next/link";

type Member = { name: string; role: string; photo?: string };

const team: Member[] = [
  { name: "Rudri Dave", role: "Co-founder and Principal", photo: "/images/rudri-dave.jpg" },
  { name: "Vibhu Dave", role: "Co-founder and Principal", photo: "/images/vibhu-dave.jpg" },
];

export default function TeamSection() {
  return (
    <section className="py-16 md:py-24" aria-label="Team">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gold mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {team.map((m) => (
            <article
              key={m.name}
              className="rounded-xl border border-white/10 bg-black/40 p-8 text-center hover:shadow-xl hover:scale-[1.02] transition-all duration-300 hover:border-gold/30"
            >
              <div className="mx-auto mb-6 h-40 w-40 rounded-full overflow-hidden border-3 border-gold/30 shadow-lg">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={`${m.name} - ${m.role}`}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center text-gold text-2xl font-bold">
                    {m.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{m.name}</h3>
              <p className="text-gold font-medium text-base mb-4">{m.role}</p>
              <Link 
                href={`/team/${m.name.toLowerCase().replace(' ', '-')}`}
                className="inline-block px-6 py-2 bg-gold text-black font-semibold rounded-lg hover:bg-gold/90 transition-colors"
              >
                View Profile
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


