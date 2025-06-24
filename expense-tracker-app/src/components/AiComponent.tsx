export function AiComponent({ result }: { result: string }) {
  return (
    <div>
      <h3>Résultat AI :</h3>
      <pre>{result || "Aucun résultat pour l’instant."}</pre>
    </div>
  );
}
