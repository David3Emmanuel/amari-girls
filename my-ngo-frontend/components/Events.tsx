"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { getAllEvents, getEventStatus, type StrapiEvent } from "@/api/events";
import { getStrapiImageUrl } from "@/api/strapi";

const STATUS_STYLES: Record<string, string> = {
  Upcoming: "bg-orange text-white",
  Ongoing: "bg-green-600 text-white",
  "Past Event": "bg-navy/60 text-white",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Events() {
  const [events, setEvents] = useState<StrapiEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEvents().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <p className="text-orange font-black text-xs uppercase tracking-[0.3em] mb-2">
            Stay Connected
          </p>
          <h2 className="text-navy font-black text-3xl md:text-4xl uppercase tracking-widest">
            Upcoming Events
          </h2>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-off-white animate-pulse h-64" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && events.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-navy/20">
            <Calendar className="w-12 h-12 text-navy/30 mx-auto mb-4" />
            <p className="text-navy font-black uppercase tracking-widest text-sm">
              No Events Scheduled
            </p>
            <p className="text-slate-muted text-xs mt-2 uppercase tracking-wide">
              Follow us on social media for announcements.
            </p>
          </div>
        )}

        {/* Event cards */}
        {!loading && events.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((ev) => {
              const status = getEventStatus(ev.start, ev.end);
              const imgUrl = getStrapiImageUrl(ev.coverImage?.url);
              const desc =
                ev.description?.length > 120
                  ? ev.description.slice(0, 120) + "…"
                  : ev.description;

              return (
                <div
                  key={ev.id}
                  className="border-2 border-navy/10 hover:border-orange transition-colors duration-200 flex flex-col"
                >
                  {/* Cover image */}
                  <div className="relative h-40 bg-navy/5 overflow-hidden">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={ev.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="w-10 h-10 text-navy/20" />
                      </div>
                    )}
                    <span
                      className={`absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest px-2 py-1 ${STATUS_STYLES[status]}`}
                    >
                      {status}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 gap-2">
                    <h3 className="text-navy font-black uppercase tracking-wide text-sm">
                      {ev.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-slate-muted uppercase tracking-wide">
                      <Calendar className="w-3.5 h-3.5 shrink-0 text-orange" />
                      <span>{formatDate(ev.start)}</span>
                    </div>

                    {ev.venue?.name && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-muted uppercase tracking-wide">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-orange" />
                        <span>{ev.venue.name}</span>
                      </div>
                    )}

                    {ev.capacity && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-muted uppercase tracking-wide">
                        <Users className="w-3.5 h-3.5 shrink-0 text-orange" />
                        <span>Capacity: {ev.capacity}</span>
                      </div>
                    )}

                    {desc && (
                      <p className="text-xs text-slate-muted leading-relaxed mt-1 flex-1">
                        {desc}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
