import {
  Clock,
  ExternalLink,
  Facebook,
  Mail,
  MapPin,
  Phone,
} from "lucide-react"
import MainLayout from "../../layouts/MainLayout"

const ContactUs = () => {
  const mapQuery = "DOST Main Building, General Santos Avenue, Central Bicutan, Taguig, Metro Manila, Philippines"
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`

  const contactCards = [
    {
      icon: MapPin,
      title: "Visit DOST",
      value: "DOST Main Building, General Santos Avenue, Brgy. Central Bicutan, Taguig, Metro Manila, Philippines",
      helper: "Located inside the DOST Complex in Bicutan.",
    },
    {
      icon: Phone,
      title: "Call the trunkline",
      value: "(+632) 8837 2071",
      helper: "Ask to be connected to the office handling your concern.",
    },
    {
      icon: Mail,
      title: "Email S&T Post",
      value: "dost.digest@gmail.com",
      helper: "For editorial concerns, article inquiries, and publication-related messages.",
      href: "mailto:dost.digest@gmail.com",
    },
    {
      icon: Facebook,
      title: "Follow S&T Post",
      value: "S&T Post Facebook Page",
      helper: "Get updates, stories, and announcements from the S&T Post team.",
      href: "https://www.facebook.com/profile.php?id=61567961533594",
    },
  ]

  return (
    <MainLayout>
      <section className="bg-blue-primary text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-secondary">
              Contact Us
            </p>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
              Reach S&T Post and the Department of Science and Technology
            </h1>
            <p className="mt-5 text-lg leading-8 text-blue-50">
              Send your questions, story leads, and publication concerns to S&T Post, or visit the DOST offices in Bicutan, Taguig City.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-blue-primary">
              Get In Touch
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-black-2">
              We are here for science, technology, and innovation stories.
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              For general DOST concerns, use the official DOST trunkline. For S&T Post article suggestions, corrections, and editorial messages, send an email to the publication team.
            </p>

            <div className="mt-8 grid gap-4">
              {contactCards.map((item) => {
                const Icon = item.icon
                const content = (
                  <>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-primary text-white">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-black-2">{item.title}</h3>
                      <p className="mt-1 font-semibold text-blue-primary">{item.value}</p>
                      <p className="mt-1 text-sm leading-6 text-gray-600">{item.helper}</p>
                    </div>
                    {item.href && (
                      <ExternalLink className="ml-auto hidden shrink-0 text-blue-primary sm:block" size={18} aria-hidden="true" />
                    )}
                  </>
                )

                if (item.href) {
                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="flex gap-4 rounded-lg border border-gray-200 p-5 transition hover:border-blue-primary hover:shadow-md"
                    >
                      {content}
                    </a>
                  )
                }

                return (
                  <div key={item.title} className="flex gap-4 rounded-lg border border-gray-200 p-5">
                    {content}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <iframe
              title="Google Map showing DOST Main Building in Bicutan, Taguig"
              src={mapUrl}
              className="h-[430px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="flex flex-col gap-4 bg-gray px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-black-2">DOST Main Building</p>
                <p className="mt-1 text-sm text-gray-700">General Santos Avenue, Central Bicutan, Taguig City</p>
              </div>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-tone-3"
              >
                Get Directions
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray py-14">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 lg:grid-cols-3 lg:px-8">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <Clock className="text-blue-primary" size={28} aria-hidden="true" />
            <h3 className="mt-4 text-xl font-extrabold text-black-2">Office Hours</h3>
            <p className="mt-3 text-gray-700">Monday to Friday, 8:00 AM to 5:00 PM, except holidays.</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <Mail className="text-blue-primary" size={28} aria-hidden="true" />
            <h3 className="mt-4 text-xl font-extrabold text-black-2">Editorial Messages</h3>
            <p className="mt-3 text-gray-700">Include your name, contact details, and a clear subject so the S&T Post team can route your concern properly.</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <MapPin className="text-blue-primary" size={28} aria-hidden="true" />
            <h3 className="mt-4 text-xl font-extrabold text-black-2">Public Visits</h3>
            <p className="mt-3 text-gray-700">Coordinate with the receiving office before visiting to confirm document requirements or appointment schedules.</p>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default ContactUs
