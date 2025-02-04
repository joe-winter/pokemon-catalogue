export default async function Page({
  params,
}: {
  params: Promise<{ pokemonName: string }>
}) {
  const pokemonName = (await params).pokemonName
  return <div>{pokemonName}</div>
}