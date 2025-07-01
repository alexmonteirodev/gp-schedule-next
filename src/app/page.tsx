import CalendarBody from "@/components/CalendarBody";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <CalendarBody />
      </main>
      <footer>options</footer>
    </div>
  );
}
