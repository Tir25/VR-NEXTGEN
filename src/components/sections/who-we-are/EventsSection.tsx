import { use3DTilt } from "@/hooks/use3DTilt";
import ErrorBoundary from "@/components/common/ErrorBoundary";

const events = [
  {
    title: "Digital Transformation Summit 2024",
    type: "Conference",
    date: "March 15-17, 2024",
    location: "San Francisco, CA",
    status: "Upcoming",
    description: "Join industry leaders for insights on the latest digital transformation trends and strategies.",
    speakers: ["Sarah Johnson", "Michael Chen", "David Rodriguez"],
    topics: ["AI & Machine Learning", "Cloud Migration", "Data Analytics", "Change Management"],
    registration: "Open"
  },
  {
    title: "Business Analytics Workshop",
    type: "Workshop",
    date: "February 28, 2024",
    location: "Virtual Event",
    status: "Upcoming",
    description: "Hands-on workshop covering advanced analytics techniques and business intelligence tools.",
    speakers: ["Dr. Lisa Wang", "James Thompson"],
    topics: ["Predictive Analytics", "Data Visualization", "Business Intelligence", "ROI Measurement"],
    registration: "Limited Spots"
  },
  {
    title: "Industry 4.0 Innovation Forum",
    type: "Forum",
    date: "January 20, 2024",
    location: "Chicago, IL",
    status: "Completed",
    description: "Exploring the future of manufacturing and industrial automation technologies.",
    speakers: ["Robert Kim", "Maria Garcia", "Alex Patel"],
    topics: ["Smart Manufacturing", "IoT Integration", "Automation", "Supply Chain"],
    registration: "Closed"
  },
  {
    title: "Data-Driven Decision Making",
    type: "Webinar",
    date: "December 15, 2023",
    location: "Online",
    status: "Completed",
    description: "Learn how to leverage data analytics for strategic business decision making.",
    speakers: ["Jennifer Lee", "Tom Wilson"],
    topics: ["Data Strategy", "KPI Development", "Performance Metrics", "Business Intelligence"],
    registration: "Recording Available"
  }
];

function EventCard({ event }: { event: typeof events[0] }) {
  const { cardRef, onMouseMove, onMouseLeave } = use3DTilt();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming": return "bg-green-100 text-green-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getRegistrationColor = (registration: string) => {
    switch (registration) {
      case "Open": return "bg-green-100 text-green-800";
      case "Limited Spots": return "bg-yellow-100 text-yellow-800";
      case "Closed": return "bg-red-100 text-red-800";
      case "Recording Available": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group bg-gradient-to-br from-white/90 to-gray-50 border border-gray-200 rounded-2xl p-8 hover:border-sand-yellow/50 hover:from-white hover:to-gray-100 transition-all duration-500 card-3d hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,215,0,0.25)] active:scale-[1.02] active:shadow-[0_0_20px_rgba(255,215,0,0.25)] relative overflow-hidden"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-sand-yellow/10 rounded-xl flex items-center justify-center text-sand-yellow group-hover:bg-sand-yellow/20 group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black group-hover:text-sand-yellow transition-colors duration-300">
                  {event.title}
                </h3>
                <p className="text-sm text-black/60">{event.type}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-black/70">
            <svg className="w-4 h-4 text-sand-yellow" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-black/70">
            <svg className="w-4 h-4 text-sand-yellow" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{event.location}</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-black/70 text-sm leading-relaxed">{event.description}</p>
        </div>

        {/* Speakers */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-black/60 uppercase tracking-wider">Featured Speakers</h4>
          <div className="flex flex-wrap gap-2">
            {event.speakers.map((speaker, index) => (
              <span key={index} className="px-3 py-1 bg-black/5 text-black text-xs font-medium rounded-full">
                {speaker}
              </span>
            ))}
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-black/60 uppercase tracking-wider">Key Topics</h4>
          <div className="flex flex-wrap gap-2">
            {event.topics.map((topic, index) => (
              <span key={index} className="px-3 py-1 bg-sand-yellow/10 text-sand-yellow text-xs font-medium rounded-full">
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Registration Status & CTA */}
        <div className="pt-4 border-t border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-black/60">Registration:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRegistrationColor(event.registration)}`}>
              {event.registration}
            </span>
          </div>
          <button className="w-full text-sand-yellow font-semibold hover:text-sand-yellow/80 transition-colors duration-300 flex items-center justify-center gap-2 group">
            {event.status === "Completed" ? "View Recording" : "Register Now"}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Brightness overlay for consistent hover effect */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-black opacity-0 group-hover:opacity-10 active:opacity-10 transition-opacity duration-300" />
    </div>
  );
}

export default function EventsSection() {
  return (
    <ErrorBoundary>
      <section id="events" className="section-services relative py-16 md:py-24" aria-label="Events">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sand-yellow/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-sand-yellow/10 rounded-full blur-2xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <header className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sand-yellow/10 border border-sand-yellow/30 rounded-full text-sand-yellow text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-sand-yellow rounded-full animate-pulse" />
              Learning & Networking
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-sand-yellow mb-6">
              Events & Workshops
            </h2>
            <p className="text-lg text-black/70 max-w-3xl mx-auto leading-relaxed">
              Join us for insightful conferences, hands-on workshops, and networking opportunities designed to advance your business knowledge and skills.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-sand-yellow text-black font-semibold rounded-lg hover:bg-sand-yellow/90 transition-colors duration-300 btn-enhanced">
                View All Events
              </button>
              <button className="px-8 py-4 border border-sand-yellow/50 text-sand-yellow font-semibold rounded-lg hover:bg-sand-yellow/10 transition-colors duration-300 btn-enhanced">
                Subscribe to Updates
              </button>
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}
