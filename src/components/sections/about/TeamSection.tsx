import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/Button";
import { use3DTilt } from "@/hooks/use3DTilt";
import { useState } from "react";

type Member = { name: string; role: string; photo?: string };

const team: Member[] = [
  { name: "Rudri Dave", role: "Co-founder and Principal", photo: "/images/rudri-dave.jpg" },
  { name: "Vibhu Dave", role: "Co-founder and Principal", photo: "/images/vibhu-dave.jpg" },
];

interface TeamCardProps {
  member: Member;
}

function TeamCard({ member }: TeamCardProps) {
  const { cardRef, onMouseMove, onMouseLeave } = use3DTilt({
    maxTilt: 8,
    enabled: true
  });

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const initials = member.name.split(" ").map((n) => n[0]).join("");

  return (
    <article
      ref={cardRef}
      className="card-3d card-shadow rounded-xl border border-white/10 bg-black/40 p-8 text-center hover:border-gold/30 transition-all duration-300"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="mx-auto mb-6 h-40 w-40 rounded-full overflow-hidden border-4 border-gold/30 shadow-lg">
        {member.photo && !imageError ? (
          <Image
            src={member.photo}
            alt={`${member.name} - ${member.role}`}
            width={160}
            height={160}
            className="w-full h-full object-cover"
            priority
            unoptimized={false}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center text-gold text-2xl font-bold border-2 border-gold/30">
            {initials}
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
      <p className="text-gold font-medium text-base mb-4">{member.role}</p>
      <Link href={`/team/${member.name.toLowerCase().replace(' ', '-')}`}>
        <Button variant="primary" size="sm">
          View Profile
        </Button>
      </Link>
    </article>
  );
}

export default function TeamSection() {
  return (
    <section className="py-16 md:py-24" aria-label="Team">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gold mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}


