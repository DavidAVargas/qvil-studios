import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section className="relative min-h-screen bg-gray-50 dark:bg-black py-20 px-6">
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-black dark:text-white mb-4 tracking-tighter">
            CONTACT
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-gray-400 dark:bg-red-900/40"></div>
            <div className="h-px w-24 bg-gray-600 dark:bg-red-800/60"></div>
            <div className="h-px w-16 bg-gray-400 dark:bg-red-900/40"></div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get in touch for collaborations, inquiries, or just to say hello.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-6 uppercase tracking-wider">
                Information
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                    Email
                  </h3>
                  <a 
                    href="mailto:contact@qvilstudios.com" 
                    className="text-black dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors"
                  >
                    contact@qvilstudios.com
                  </a>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                    Instagram
                  </h3>
                  <a 
                    href="https://instagram.com/qvilstudios" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors"
                  >
                    @qvilstudios
                  </a>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                    Location
                  </h3>
                  <p className="text-black dark:text-gray-300">
                    New York, NY
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-6 uppercase tracking-wider">
              Send Message
            </h2>
            
            <form className="space-y-6">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm uppercase tracking-widest text-gray-700 dark:text-gray-400 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-black dark:text-white focus:outline-none focus:border-red-800 dark:focus:border-red-800 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm uppercase tracking-widest text-gray-700 dark:text-gray-400 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-black dark:text-white focus:outline-none focus:border-red-800 dark:focus:border-red-800 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm uppercase tracking-widest text-gray-700 dark:text-gray-400 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-black dark:text-white focus:outline-none focus:border-red-800 dark:focus:border-red-800 transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-950 dark:bg-red-950 text-white hover:bg-red-900 dark:hover:bg-red-900 px-8 py-6 text-base font-semibold rounded-none border-2 border-red-800/50 uppercase tracking-widest transition-all duration-300"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

