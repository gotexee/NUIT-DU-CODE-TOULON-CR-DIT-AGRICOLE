export default function Contact() {
  return (
    <section id="contact" className="max-w-3xl mx-auto py-16 px-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nous contacter</h2>

      <form action="#" method="POST" className="grid grid-cols-1 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nom complet
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>
 
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 text-white font-bold py-3 px-6 rounded-md hover:bg-green-800 transition-colors"
        >
          Envoyer le message
        </button>
      </form>
    </section>
  );
}
