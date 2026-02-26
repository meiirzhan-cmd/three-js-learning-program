// Change this import to switch lessons
import Lesson from "./lessons/lesson-1";

export default function App() {
  return (
    <div className="bg-[#0a0a0f] min-h-screen text-[#e8e6f0] font-[Inter,-apple-system,sans-serif] px-6 py-8 max-w-[680px] mx-auto">
      <Lesson />
    </div>
  );
}
