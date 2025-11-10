// Section 1: Value Proposition
export const ValueProposition = () => (
  <section className="bg-gradient-to-br from-sky-50 via-white to-sky-100 py-24 px-8 text-center">
    <h2 className="text-5xl font-extrabold text-sky-600 mb-6 drop-shadow">Empowering Mobility with Intelligent Neuro-Exosuits</h2>
    <p className="text-xl text-slate-700 max-w-3xl mx-auto">
      BioLife creates AI-driven, mind-controlled exoskeletons to restore independence for those with muscular dystrophy. Our smart wearable system translates neural signals into movement — enabling a future where thought leads action.
    </p>
    <button className="mt-10 px-8 py-3 bg-sky-600 text-white rounded-xl font-semibold hover:bg-sky-700 transition">Get a Demo</button>
  </section>
);

// Section 2: About Us

// Section 3: Product Overview
export const ProductDetails = () => (
  <section className="bg-sky-50 py-24 px-8 text-center">
    <h2 className="text-4xl font-bold text-sky-600 mb-6">Our Innovation</h2>
    <p className="text-lg text-slate-700 max-w-3xl mx-auto mb-10">
      BioLife Exosuit is a lightweight, AI-powered wearable that responds to brain signals using embedded neural sensors. Designed for patients with neuromuscular diseases, it adapts in real-time for safe and intuitive walking.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-xl p-6 shadow border border-sky-100">
        <img src="/icons/brain.png" className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-sky-500">Neural Signal Decoder</h3>
        <p className="text-slate-600">Picks up brain signals and converts them into precise motion patterns.</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow border border-sky-100">
        <img src="/icons/ai-chip.png" className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-sky-500">Adaptive AI</h3>
        <p className="text-slate-600">Learns patient gait and dynamically adjusts movement support.</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow border border-sky-100">
        <img src="/icons/safety.png" className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-sky-500">Smart Safety</h3>
        <p className="text-slate-600">Auto-correction and fallback systems ensure secure walking at all times.</p>
      </div>
    </div>
    <div className="mt-16">
      <h3 className="text-xl font-semibold text-slate-600 mb-4">Experience Our Solution</h3>
      <div className="aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden border-2 border-sky-200">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/your-video-id"
          title="BioLife Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </section>
);

// Section 4: CTA & Contact


// Combine all in one export
export default function SolutionPage() {
  return (
    <>
      <ValueProposition />
     
      <ProductDetails />
     
    </>
  );
}
