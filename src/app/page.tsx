"use client"
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';

export default function Home() {
  return (
    <div className="min-h-screen ">
      <Hero />
      <Timeline />
      <Gallery />
    </div>
  );
}
