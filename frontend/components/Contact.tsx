// ----------------------------------------------------------------------
// Contact Overlay Component (No Changes)
// ----------------------------------------------------------------------

interface ContactOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * A full-screen overlay for contact information, inspired by futurethree.studio
 */
export const ContactOverlay: React.FC<ContactOverlayProps> = ({ isOpen, onClose }) => {
// ... (The entire ContactOverlay component code is unchanged) ...
  return (
    <div
      className={`
        fixed inset-0 z-50
        flex flex-col items-center justify-center
        transition-all duration-500 ease-in-out
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose} // Close the overlay when clicking the background
      />

      {/* Content Box */}
      {/* We use stopPropagation to prevent clicks inside the box from closing the overlay */}
      <div
        className={`
          relative z-10 w-full max-w-6xl rounded-lg bg-white p-10 text-black shadow-2xl
          transition-all duration-500 ease-in-out md:p-14
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Section */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          {/* "Let's Talk" */}
          <h2 className="text-6xl font-bold md:text-7xl">Let's Talk</h2>
          
          {/* Info */}
          <div className="flex-shrink-0 text-left md:text-right">
            <a
              href="mailto:hello@futurethree.studio"
              className="mb-1 block text-lg font-medium underline transition-opacity hover:opacity-70 md:text-xl"
            >
              hello@futurethree.studio
            </a>
            <a
              href="tel:+4915758518742"
              className="block text-lg font-medium underline transition-opacity hover:opacity-70 md:text-xl"
            >
              +49 157 58518742
            </a>
          </div>

          {/* Socials */}
          <div className="flex-shrink-0 text-left md:text-right">
            {/* Language switch (placeholder) */}
            <div className="mb-2 text-xs uppercase text-gray-500">
              <span className="font-bold text-black">ENGLISH</span> / <span>DEUTSCH</span>
            </div>
            {/* Social Links */}
            <div className="flex gap-4 md:justify-end">
              <a href="#" className="font-medium underline transition-opacity hover:opacity-70">IG</a>
              <a href="#" className="font-medium underline transition-opacity hover:opacity-70">LI</a>
              <a href="#" className="font-medium underline transition-opacity hover:opacity-70">YT</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-300 md:my-12" />

        {/* Form Section */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission logic here
            console.log("Form submitted!");
          }}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              {/* Your Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-md border border-gray-200 bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              {/* Company Name */}
              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  className="w-full rounded-md border border-gray-200 bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md border border-gray-200 bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col">
              {/* Your Message */}
              <div className="flex-grow">
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={8}
                  className="w-full flex-grow resize-none rounded-md border border-gray-200 bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-black"
                ></textarea>
              </div>
              {/* Submit Button */}
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="rounded-sm bg-black px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-80"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Close Button (Bottom Center) */}
      <button
        onClick={onClose}
        className={`
          relative z-10 mt-6
          text-lg font-bold text-white
          transition-all duration-500 ease-in-out
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}
      >
        Close
      </button>
    </div>
  );
};
