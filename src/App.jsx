import TypingTest from "./components/TypingTest";
import { Sentences } from "./Data/sentences";
function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <TypingTest />
      <Sentences/>
    </div>
  );
}

export default App;
