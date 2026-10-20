import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-night px-6 text-bone">
      <div className="max-w-md text-center">
        <p className="eyebrow text-wood">Error 404</p>
        <h1 className="mt-6 text-h2">
          Este espacio <span className="accent">aún no existe</span>
        </h1>
        <p className="mt-6 text-muted-dark">La página que buscas no está aquí.</p>
        <Link href="/" className="btn btn-primary mt-10">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
