import MainLayout from '../../layouts/MainLayout'

const AboutUs = () => {
  return (
    <MainLayout>
      <section className="bg-blue-primary text-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-secondary">
            About S&T Post
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
            Sharing science, technology, and innovation stories for every Filipino
          </h1>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-blue-primary">
              Who We Are
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-black-2">
              S&T Post is a digital publication of the Department of Science and Technology.
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-700">
              S&T Post features news, stories, and updates about science and technology in the Philippines. It highlights the programs, research, innovations, and public services of the Department of Science and Technology, helping bring science closer to communities, industries, and everyday Filipino life.
            </p>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Through accessible articles and multimedia content, S&T Post supports DOST's commitment to promote knowledge, innovation, and science-based solutions for national development.
            </p>
          </div>

          <div className="rounded-lg bg-gray p-6 lg:p-8">
            <h3 className="text-2xl font-extrabold text-blue-primary">
              Our Focus
            </h3>
            <div className="mt-6 space-y-5">
              <div>
                <h4 className="font-bold text-black-2">Science for the people</h4>
                <p className="mt-1 text-gray-700">
                  Making DOST stories easier to find, read, and share.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-black-2">Innovation updates</h4>
                <p className="mt-1 text-gray-700">
                  Covering research, technologies, programs, and services across the S&T sector.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-black-2">Public engagement</h4>
                <p className="mt-1 text-gray-700">
                  Connecting Filipinos with science-based solutions and opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default AboutUs
