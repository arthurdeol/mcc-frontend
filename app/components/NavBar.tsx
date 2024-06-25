export default function NavBar() {
  return (
    <div className="w-screen h-16 flex items-center justify-between px-8 shadow-sm">
      <img src="./images/logomcc.jpeg" alt="MCC logo" className="w-36" />
      <button className="bg-transparent hover:bg-red-500 text-red-700 hover:text-white py-1 px-4 border rounded-lg border-red-500 hover:border-transparent">
        Login
      </button>
    </div>
  );
}
