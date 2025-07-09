"use client";

import PatternLayout from "@/components/PatternLayout";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Target interface
interface MediaPlayer {
  play: (filename: string) => string;
}

// Adaptee (incompatible interface)
class VLCPlayer {
  playVLC(file: string) {
    return `Playing VLC file: ${file}`;
  }
}

// Adapter
class MediaAdapter implements MediaPlayer {
  private vlcPlayer = new VLCPlayer();

  play(filename: string): string {
    return this.vlcPlayer.playVLC(filename);
  }
}

export default function AdapterPage() {
  const [result, setResult] = useState("");

  const handlePlay = () => {
    const player: MediaPlayer = new MediaAdapter();
    setResult(player.play("movie.vlc"));
  };

  return (
    <PatternLayout title="Adapter">
      <p className="mb-4">
        Convert the interface of a class into another interface clients expect.
        Adapter lets classes work together that couldn’t otherwise due to
        incompatible interfaces.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What is it?</h2>
      <p className="mb-4">
        The Adapter pattern acts as a bridge between two incompatible
        interfaces. It wraps the existing class and makes it compatible with the
        client’s expected interface.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Example</h2>
      <button
        onClick={handlePlay}
        className="bg-teal-600 hover:bg-teal-500 px-4 py-2 rounded text-white mb-4"
      >
        Play VLC File
      </button>

      {result && <p className="mb-6 text-green-400 font-semibold">{result}</p>}

      <SyntaxHighlighter language="ts" style={atomDark} className="rounded">
        {`// Target interface
interface MediaPlayer {
  play: (filename: string) => string;
}

// Adaptee
class VLCPlayer {
  playVLC(file: string) {
    return \`Playing VLC file: \${file}\`;
  }
}

// Adapter
class MediaAdapter implements MediaPlayer {
  private vlcPlayer = new VLCPlayer();

  play(filename: string): string {
    return this.vlcPlayer.playVLC(filename);
  }
}

const player: MediaPlayer = new MediaAdapter();
console.log(player.play('movie.vlc'));`}
      </SyntaxHighlighter>

      <h2 className="text-xl font-semibold mt-6 mb-2">Common Uses</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Integrating legacy or third-party code</li>
        <li>Unifying APIs from different libraries</li>
        <li>Working with different data formats</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">When to Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Need to make incompatible code work together</li>
        <li>You want to decouple client code from concrete classes</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Caution</h2>
      <ul className="list-disc ml-6">
        <li>Can add extra layers of complexity</li>
        <li>Should not be overused as a permanent fix for bad design</li>
      </ul>
    </PatternLayout>
  );
}
