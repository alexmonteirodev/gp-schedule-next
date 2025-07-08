import CalendarBody from "@/components/CalendarBody";
import Header from "@/components/Header";
import UserOptions from "@/components/UserOptions";

export default function Home() {
  return (
    <div className="mx-5 my-3">
      <header>
        <Header />
      </header>
      <main>
        <CalendarBody />
      </main>
      <footer>
        <UserOptions />
      </footer>
    </div>
  );
}
